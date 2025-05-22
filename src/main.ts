import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://aether-art.netlify.app/',
    credentials: true,
  });
  app.use(cookieParser());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Aether art API')
    .setDescription('API for artist contest platform')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
