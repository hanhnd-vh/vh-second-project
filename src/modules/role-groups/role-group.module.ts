import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role, RoleGroup, RoleGroupRole } from 'src/models';
import { RoleGroupController } from './role-group.controller';
import { RoleGroupService } from './role-group.service';

@Module({
    imports: [SequelizeModule.forFeature([RoleGroup, Role, RoleGroupRole])],
    controllers: [RoleGroupController],
    providers: [RoleGroupService],
    exports: [SequelizeModule],
})
export class RoleGroupModule {}
