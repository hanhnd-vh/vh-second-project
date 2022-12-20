import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigKey } from './common/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.setGlobalPrefix(configService.get<string>(ConfigKey.API_PREFIX));
    await app.listen(configService.get<string>(ConfigKey.PORT));
}
bootstrap();
