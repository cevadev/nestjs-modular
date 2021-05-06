import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('New Store')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  //endpoint de la documentacion, la llamaremos docs
  SwaggerModule.setup('docs', app, document);

  //habilitamos CORS para que se haga peticiones a nuestra API desde cualquier cliente
  app.enableCors();

  //heroku nos pasará el puerto 8080, lo recibimos o en su defecto usamos el puerto 3000
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
