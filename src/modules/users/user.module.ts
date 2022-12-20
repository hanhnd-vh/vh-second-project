import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role, RoleGroup, User, UserRole, UserRoleGroup } from 'src/models';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        SequelizeModule.forFeature([
            User,
            UserRole,
            UserRoleGroup,
            RoleGroup,
            Role,
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [SequelizeModule],
})
export class UserModule {}
