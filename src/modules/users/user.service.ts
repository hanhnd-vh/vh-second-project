import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role, RoleGroup, User } from 'src/models';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Role) private roleModel: typeof Role,
        @InjectModel(RoleGroup) private roleGroupModel: typeof RoleGroup,
    ) {}
}
