import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role, User } from 'src/models';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Role) private roleModel: typeof Role,
    ) {}
}
