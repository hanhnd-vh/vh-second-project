import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission, Role, RoleGroup, RoleGroupRole } from 'src/models';
import { RolePermission } from 'src/models/role-permission';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
    imports: [
        SequelizeModule.forFeature([
            RoleGroup,
            Role,
            Permission,
            RoleGroupRole,
            RolePermission,
        ]),
    ],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [SequelizeModule],
})
export class RoleModule {}
