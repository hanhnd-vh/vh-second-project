import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission, Role } from 'src/models';
import { RolePermission } from 'src/models/role-permission';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
    imports: [SequelizeModule.forFeature([Role, Permission, RolePermission])],
    controllers: [RoleController],
    providers: [JwtService, RoleService],
    exports: [SequelizeModule, RoleService],
})
export class RoleModule {}
