import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role, User } from 'src/models';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [SequelizeModule.forFeature([User, Role])],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [SequelizeModule],
})
export class AuthModule {}
