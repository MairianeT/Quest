import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { handleMarkerDetection } from './marker';
import { Server } from 'socket.io';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('D:\\Program Files\\OpenSSL-Win64\\bin\\private.key'),
    cert: fs.readFileSync('D:\\Program Files\\OpenSSL-Win64\\bin\\certificate.crt'),
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });

  // Подключение директории для статических файлов
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  // Подключение к серверу сокетов
  const server = app.getHttpServer();
  const io = new Server(server);

  // Обработка события считывания маркерного изображения
  handleMarkerDetection(io);
  const port = process.env.PORT || 443;
  await app.listen(port);
  Logger.log(`Server is running on https://localhost:${port}`);
}

bootstrap();
