import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DiscoveryService } from '@advanced-web/discovery';
import { Express } from 'express';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // 🔹 Lancement du microservice TCP
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: '0.0.0.0', port: 4003 },
    },
  );
  microservice.listen();
  console.log('🚀 Microservice Livraison démarré sur TCP (port 4003)');

  // 🔹 Instance HTTP pour Swagger et API REST
  const app = await NestFactory.create(AppModule);
  
  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('Service de Livraison')
    .setDescription(`
      API pour la gestion des livraisons de commandes.
      
      ## Fonctionnalités
      
      - Récupération des commandes disponibles pour livraison
      - Acceptation/refus des demandes de livraison
      - Suivi de l'état d'une livraison
      - Consultation des livraisons assignées à un livreur
      
      ## Modèle de données
      
      Les livraisons sont basées sur des commandes (Orders) avec différents statuts:
      
      - READY: Prêt à être livré
      - ACCEPTED: Livraison acceptée par un livreur
      - IN_PROGRESS: Livraison en cours
      - DELIVERED: Livraison terminée
    `)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Entrez votre token JWT',
        in: 'header',
      },
      'access-token',
    )
    .addTag('Delivery', 'Opérations liées aux livraisons')
    .addTag('Health', 'Vérification de l\'état du service')
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
  SwaggerModule.setup('docs', app, document);

  // Configuration globale
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: false,
    forbidNonWhitelisted: false,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  await app.listen(3003, '0.0.0.0');

  // Enregistrement auprès du service de découverte
  const discoveryService = app.get(DiscoveryService);
  await discoveryService.registerService({
    name: 'delivery-service',
    url: 'http://localhost:3003',
    swaggerUrl: 'http://localhost:3003/api-json',
  });
  console.log('✅ Service Livraison enregistré auprès du service de découverte');
  console.log('📄 Swagger delivery-service disponible sur http://localhost:3003/docs');
  console.log('📄 Documentation JSON disponible sur http://localhost:3003/api-json');
}

bootstrap().catch((error) => {
  console.error('❌ Erreur au démarrage du service livraison :', error);
}); 