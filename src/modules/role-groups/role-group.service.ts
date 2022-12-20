import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role, RoleGroup } from 'src/models';

@Injectable()
export class RoleGroupService {
    constructor(
        @InjectModel(Role) private roleModel: typeof Role,
        @InjectModel(RoleGroup) private roleGroupModel: typeof RoleGroup,
    ) {}
}
