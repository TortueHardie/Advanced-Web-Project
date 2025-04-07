import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Log Service API')
    .setDescription('API pour la gestion des logs système')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`🚀 Log service started on port ${port}`);
}
bootstrap();
