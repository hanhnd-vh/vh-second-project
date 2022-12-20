import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission, Role } from 'src/models';
import { RolePermission } from 'src/models/role-permission';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
    imports: [SequelizeModule.forFeature([Role, Permission, RolePermission])],
    controllers: [PermissionController],
    providers: [PermissionService],
    exports: [SequelizeModule],
})
export class PermissionModule {}
