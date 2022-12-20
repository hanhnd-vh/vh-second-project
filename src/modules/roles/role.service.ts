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
import { Permission, Role, RoleGroup } from 'src/models';
import {
    IChangeRolePermissionsBody,
    ICreateRoleBody,
    IGetRoleListQuery,
    IUpdateRoleBody,
} from './role.interface';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Permission) private permissionModel: typeof Permission,
        @InjectModel(Role) private roleModel: typeof Role,
    ) {}

    async createRole(body: ICreateRoleBody) {
        const isRoleExisted = await this.checkExistedRoleName(body.name);
        if (isRoleExisted) {
            throw new ItemAlreadyExistedException('role existed!');
        }
        const createdRole = await this.roleModel.create(body);
        const role = await this.getRoleById(createdRole.id);
        return role;
    }

    async getRoleById(roleId: number) {
        const role = await Role.findByPk(roleId, {
            include: [Permission],
        });
        if (!role) {
            throw new NotFoundException('role not found!');
        }
        return role;
    }

    async getRoleList(query: IGetRoleListQuery) {
        const {
            page = DEFAULT_PAGE_VALUE,
            limit = DEFAULT_PAGE_LIMIT,
            orderBy = DEFAULT_ORDER_BY,
            orderDirection = DEFAULT_ORDER_DIRECTION,
        } = query;
        const offset = (+page - 1) * +limit;

        const { rows, count } = await this.roleModel.findAndCountAll({
            offset,
            limit: +limit,
            order: [[`${orderBy}`, `${orderDirection}`]],
        });
        return { items: rows, totalItems: count };
    }

    async updateRole(roleId: number, body: IUpdateRoleBody) {
        const role = await this.getRoleById(roleId);
        const updatedRole = await role.update(body);
        return updatedRole;
    }

    async changeRolePermissions(
        roleId: number,
        body: IChangeRolePermissionsBody,
    ) {
        const role = await this.getRoleById(roleId);
        const isPermissionIdsExisted = await this.checkExistedPermissionIds(
            body.permissionIds,
        );
        if (!isPermissionIdsExisted) {
            throw new NotFoundException('some permissions not existed');
        }
        await role.setPermissions(body.permissionIds);
        const updatedRole = await this.getRoleById(roleId);
        return updatedRole;
    }

    async deleteRole(roleId: number) {
        const role = await this.getRoleById(roleId);
        await role.destroy();
        return 'OK';
    }

    async checkExistedRoleName(name: string) {
        const role = await this.roleModel.findOne({
            where: {
                name,
            },
        });
        if (role) return true;
        return false;
    }

    async checkExistedPermissionIds(permissionIds: number[]) {
        const uniqPermissionIds = uniq(permissionIds);
        const existedPermissionList = await this.permissionModel.findAll({
            where: {
                id: uniqPermissionIds,
            },
        });
        return existedPermissionList.length === uniqPermissionIds.length;
    }

    async getRolesByRoleGroupIds(roleGroupIds: number[]) {
        const permissions = await this.roleModel.findAll({
            include: [
                {
                    model: RoleGroup,
                    attributes: ['id'],
                    as: 'roleGroups',
                    where: {
                        id: roleGroupIds,
                    },
                },
            ],
        });
        return permissions;
    }
}
