import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from 'src/models';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
    imports: [SequelizeModule.forFeature([Permission])],
    controllers: [PermissionController],
    providers: [PermissionService],
    exports: [SequelizeModule, PermissionService],
})
export class PermissionModule {}
