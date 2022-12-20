import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseSequelizeModule } from './common/services/sequelize.service';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionModule } from './modules/permissions/permission.module';
import { RoleGroupModule } from './modules/role-groups/role-group.module';
import { RoleModule } from './modules/roles/role.module';
import { UserModule } from './modules/users/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        DatabaseSequelizeModule,
        AuthModule,
        UserModule,
        RoleModule,
        RoleGroupModule,
        PermissionModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
