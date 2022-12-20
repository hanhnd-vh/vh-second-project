import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role, User } from 'src/models';
import { PermissionModule } from '../permissions/permission.module';
import { RoleModule } from '../roles/role.module';
import { UserModule } from './../users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        SequelizeModule.forFeature([User, Role]),
        JwtModule.register({}),
        UserModule,
        RoleModule,
        PermissionModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [SequelizeModule],
})
export class AuthModule {}
