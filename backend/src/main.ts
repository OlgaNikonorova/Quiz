declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';

async function bootstrap() {
  const globalPrefix = 'api';
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    )
    .setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Quiz')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
    yamlDocumentUrl: 'swagger/yaml',
  });

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
