import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permission, Role } from 'src/models';

@Injectable()
export class PermissionService {
    constructor(
        @InjectModel(Role) private roleModel: typeof Role,
        @InjectModel(Permission) private permissionModel: typeof Permission,
    ) {}

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
