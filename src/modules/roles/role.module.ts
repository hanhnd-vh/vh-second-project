import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission, Role, RoleGroup } from 'src/models';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
    imports: [SequelizeModule.forFeature([RoleGroup, Role, Permission])],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [SequelizeModule],
})
export class RoleModule {}
