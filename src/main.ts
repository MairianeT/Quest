import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import hbs = require('hbs');
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');


  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  const config = new DocumentBuilder()
    .setTitle('Quest')
    .setDescription('Quest by stations')
    .setVersion('1.0')
    .addTag('quest')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 443;
  await app.listen(port);
  Logger.log(`Server is running on https://localhost:${port}`);
}

bootstrap();
