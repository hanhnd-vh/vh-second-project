import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from 'src/models';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
    imports: [SequelizeModule.forFeature([Permission])],
    controllers: [PermissionController],
    providers: [JwtService, PermissionService],
    exports: [SequelizeModule, PermissionService],
})
export class PermissionModule {}
