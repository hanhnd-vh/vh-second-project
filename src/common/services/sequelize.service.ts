import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { ConfigKey } from './../config/config-key';

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    dialect: configService.get<Dialect>(
                        ConfigKey.SEQUELIZE_DATABASE_DIALECT,
                    ),
                    host: configService.get<string>(
                        ConfigKey.SEQUELIZE_DATABASE_HOST,
                    ),
                    port: configService.get<number>(
                        ConfigKey.SEQUELIZE_DATABASE_PORT,
                    ),
                    username: configService.get<string>(
                        ConfigKey.SEQUELIZE_DATABASE_USERNAME,
                    ),
                    password: configService.get<string>(
                        ConfigKey.SEQUELIZE_DATABASE_PASSWORD,
                    ),
                    models: [],
                };
            },
        }),
    ],
    providers: [],
})
export class DatabaseSequelizeModule {}
