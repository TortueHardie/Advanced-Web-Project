import { NestFactory } from '@nestjs/core';
import { LocationModule } from './location.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DiscoveryService } from '@advanced-web/discovery';
import { Express } from 'express';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(LocationModule);
  
  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('Service de Livraison')
    .setDescription('API pour la gestion des livraisons')
    .setVersion('1.0')
    .addTag('Delivery')
    .addTag('Health')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  
  // Exposer la documentation Swagger au format JSON
  const expressApp = app.getHttpAdapter().getInstance() as Express;
  expressApp.get('/api-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });

  // Endpoint de santé
  expressApp.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  
  // Exposer l'interface Swagger
  SwaggerModule.setup('api', app, document);

  // Configuration globale
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: false,
    forbidNonWhitelisted: false,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  await app.listen(3003);

  // Enregistrement auprès du service de découverte
  const discoveryService = app.get(DiscoveryService);
  await discoveryService.registerService({
    name: 'location-service',
    url: 'http://localhost:3003',
    swaggerUrl: 'http://localhost:3003/api-json',
  });
  console.log('✅ Service Location enregistré auprès du service de découverte');
  console.log('📄 Swagger location-service disponible sur http://localhost:3003/api');
  console.log('📄 Documentation JSON disponible sur http://localhost:3003/api-json');
}

bootstrap().catch((error) => {
  console.error('❌ Erreur au démarrage du service location :', error);
}); 