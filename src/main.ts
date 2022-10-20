import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  initSwagger(app);

  await app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.info(
      '\x1b[36m%s\x1b[0m',
      `URL: http://${process.env.HOSTNAME}:${process.env.PORT}`,
    );
  });
}

function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Finance API Documentation')
    .setVersion('1.0')
    .addTag('category')
    .addTag('log')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

bootstrap();
