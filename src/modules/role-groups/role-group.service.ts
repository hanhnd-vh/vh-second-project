import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { uniq } from 'lodash';
import {
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_PAGE_LIMIT,
    DEFAULT_PAGE_VALUE,
} from 'src/common/constants';
import { ItemAlreadyExistedException } from 'src/exception/item-already-existed.exception';
import { Role, RoleGroup } from 'src/models';
import {
    IChangeRoleGroupRolesBody,
    ICreateRoleGroupBody,
    IGetRoleGroupListQuery,
    IUpdateRoleGroupBody,
} from './role-group.interface';

@Injectable()
export class RoleGroupService {
    constructor(
        @InjectModel(Role) private roleModel: typeof Role,
        @InjectModel(RoleGroup) private roleGroupModel: typeof RoleGroup,
    ) {}

    async createRoleGroup(body: ICreateRoleGroupBody) {
        const isRoleGroupExisted = await this.checkExistedRoleGroupName(
            body.name,
        );
        if (isRoleGroupExisted) {
            throw new ItemAlreadyExistedException('role group existed');
        }
        const createdRoleGroup = await this.roleGroupModel.create(body);
        const roleGroup = await this.getRoleGroupById(createdRoleGroup.id);
        return roleGroup;
    }

    async getRoleGroupById(roleGroupId: number) {
        const roleGroup = await this.roleGroupModel.findByPk(roleGroupId, {
            include: [Role],
        });
        if (!roleGroup) {
            throw new NotFoundException('role group not found');
        }
        return roleGroup;
    }

    async getRoleGroupList(query: IGetRoleGroupListQuery) {
        const {
            page = DEFAULT_PAGE_VALUE,
            limit = DEFAULT_PAGE_LIMIT,
            orderBy = DEFAULT_ORDER_BY,
            orderDirection = DEFAULT_ORDER_DIRECTION,
        } = query;
        const offset = (+page - 1) * +limit;

        const { rows, count } = await this.roleGroupModel.findAndCountAll({
            offset,
            limit: +limit,
            order: [[`${orderBy}`, `${orderDirection}`]],
        });
        return { items: rows, totalItems: count };
    }

    async updateRoleGroup(roleGroupId: number, body: IUpdateRoleGroupBody) {
        const roleGroup = await this.getRoleGroupById(roleGroupId);
        const updatedRoleGroup = await roleGroup.update(body);
        return updatedRoleGroup;
    }

    async changeRoleGroupRoles(
        roleGroupId: number,
        body: IChangeRoleGroupRolesBody,
    ) {
        const roleGroup = await this.getRoleGroupById(roleGroupId);
        const isRoleIdsExisted = await this.checkExistedRoleIds(body.roleIds);
        if (!isRoleIdsExisted) {
            throw new NotFoundException('some roles not existed');
        }
        await roleGroup.setRoles(body.roleIds);
        const updatedRoleGroup = await this.getRoleGroupById(roleGroupId);
        return updatedRoleGroup;
    }

    async deleteRoleGroup(roleGroupId: number) {
        const roleGroup = await this.getRoleGroupById(roleGroupId);
        await roleGroup.destroy();
        return 'OK';
    }

    async checkExistedRoleGroupName(name: string) {
        const roleGroup = await this.roleGroupModel.findOne({
            where: {
                name,
            },
        });
        if (roleGroup) return true;
        return false;
    }

    async checkExistedRoleIds(roleIds: number[]) {
        const uniqRoleIds = uniq(roleIds);
        const existedRoleList = await this.roleModel.findAll({
            where: {
                id: uniqRoleIds,
            },
        });
        return existedRoleList.length === uniqRoleIds.length;
    }
}
