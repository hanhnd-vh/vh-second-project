import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_PAGE_LIMIT,
    DEFAULT_PAGE_VALUE,
} from 'src/common/constants';
import { ItemAlreadyExistedException } from 'src/exception/item-already-existed.exception';
import { Permission, Role } from 'src/models';
import {
    ICreatePermissionBody,
    IGetPermissionListQuery,
    IUpdatePermissionBody,
} from './permission.interface';

@Injectable()
export class PermissionService {
    constructor(
        @InjectModel(Permission) private permissionModel: typeof Permission,
    ) {}

    async createPermission(body: ICreatePermissionBody) {
        const isPermissionExisted = await this.checkExistedPermissionName(
            body.name,
        );
        if (isPermissionExisted) {
            throw new ItemAlreadyExistedException('permission existed');
        }
        const createdPermission = await this.permissionModel.create(body);
        const permission = await this.getPermissionById(createdPermission.id);
        return permission;
    }

    async getPermissionById(permissionId: number) {
        const permission = await this.permissionModel.findByPk(permissionId);
        if (!permission) {
            throw new NotFoundException('permission not found!');
        }
        return permission;
    }

    async getPermissionList(query: IGetPermissionListQuery) {
        const {
            page = DEFAULT_PAGE_VALUE,
            limit = DEFAULT_PAGE_LIMIT,
            orderBy = DEFAULT_ORDER_BY,
            orderDirection = DEFAULT_ORDER_DIRECTION,
        } = query;
        const offset = (+page - 1) * +limit;

        const { rows, count } = await this.permissionModel.findAndCountAll({
            offset,
            limit: +limit,
            order: [[`${orderBy}`, `${orderDirection}`]],
        });
        return { items: rows, totalItems: count };
    }

    async updatePermission(permissionId: number, body: IUpdatePermissionBody) {
        const permission = await this.getPermissionById(permissionId);
        const updatedPermission = await permission.update(body);
        return updatedPermission;
    }

    async deletePermission(permissionId: number) {
        const permission = await this.getPermissionById(permissionId);
        await permission.destroy();
        return 'OK';
    }

    async checkExistedPermissionName(name: string) {
        const permission = await this.permissionModel.findOne({
            where: {
                name,
            },
        });
        if (permission) return true;
        return false;
    }
    async getPermissionsByRoleIds(roleIds: number[]) {
        const permissions = await this.permissionModel.findAll({
            include: [
                {
                    model: Role,
                    attributes: ['id'],
                    as: 'roles',
                    where: {
                        id: roleIds,
                    },
                },
            ],
        });
        return permissions;
    }
}
