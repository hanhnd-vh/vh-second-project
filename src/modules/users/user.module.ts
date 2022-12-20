import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role, RoleGroup, User } from 'src/models';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [SequelizeModule.forFeature([User, RoleGroup, Role])],
    controllers: [UserController],
    providers: [UserService],
    exports: [SequelizeModule],
})
export class UserModule {}
