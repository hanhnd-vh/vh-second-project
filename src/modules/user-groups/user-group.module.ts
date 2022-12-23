import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserGroupUser } from 'src/models';
import { UserGroup } from 'src/models/user-group.model';
import { UserModule } from '../users/user.module';
import { UserGroupController } from './user-group.controller';
import { UserGroupService } from './user-group.service';

@Module({
    imports: [
        SequelizeModule.forFeature([UserGroup, UserGroupUser]),
        UserModule,
    ],
    controllers: [UserGroupController],
    providers: [JwtService, UserGroupService],
    exports: [SequelizeModule],
})
export class UserGroupModule {}
