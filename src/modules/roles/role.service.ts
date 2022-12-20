import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permission, Role, RoleGroup } from 'src/models';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Permission) private permissionModel: typeof Permission,
        @InjectModel(Role) private roleModel: typeof Role,
        @InjectModel(RoleGroup) private roleGroupModel: typeof RoleGroup,
    ) {}
}
