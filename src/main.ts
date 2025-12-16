import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Mini API REST - Gestion Utilisateurs/Transactions')
    .setDescription('API pour la gestion des utilisateurs et des transactions')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  SwaggerModule.setup('api/docs', app, document);
  SwaggerModule.setup('api/swagger', app, document);
  SwaggerModule.setup('api/documentation', app, document);
  SwaggerModule.setup('documentations', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application démarrée sur : http://localhost:${port}`);
  console.log(`Documentation Swagger disponible sur :`);
  console.log(`  - http://localhost:${port}/`);
  console.log(`  - http://localhost:${port}/api/docs`);
  console.log(`  - http://localhost:${port}/api/swagger`);
  console.log(`  - http://localhost:${port}/api/documentation`);
  console.log(`  - http://localhost:${port}/documentations`);
}

void bootstrap();
