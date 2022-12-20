import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseSequelizeModule } from './common/services/sequelize.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        DatabaseSequelizeModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
