import { NestFactory } from '@nestjs/core';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';
import { getFromContainer, MetadataStorage } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('car price api').build()
  const document = SwaggerModule.createDocument(app,config);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }));
  SwaggerModule.setup('api',app,document);
  await app.listen(3000);
}
bootstrap();
