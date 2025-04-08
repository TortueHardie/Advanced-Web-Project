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
      options: { host: '0.0.0.0', port: 4002 },
    },
  );
  microservice.listen();
  console.log('🚀 Microservice Product démarré sur TCP (port 4002)');

  // 🔹 Instance HTTP pour Swagger et API REST
  const app = await NestFactory.create(AppModule);
  
  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('Service de Produits')
    .setDescription(`
      API pour la gestion des restaurants, menus et articles.
      
      ## Fonctionnalités
      
      - Gestion complète des restaurants (CRUD)
      - Gestion des menus pour chaque restaurant
      - Gestion des articles individuels
      - Gestion des stocks et de la disponibilité
      
      ## Modèle de données
      
      Les données sont organisées selon la hiérarchie suivante:
      
      Restaurant 
      ├── Menus
      │   └── Articles (via relation many-to-many)
      └── Articles (articles disponibles individuellement)
      
      ## Statuts
      
      Les restaurants peuvent avoir les statuts suivants:
      - ACTIVE: Restaurant en activité
      - INACTIVE: Restaurant temporairement fermé
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
    .addTag('Restaurants', 'Opérations liées aux restaurants')
    .addTag('Menus', 'Opérations liées aux menus')
    .addTag('Articles', 'Opérations liées aux articles')
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

  await app.listen(3002);

  // Enregistrement auprès du service de découverte
  const discoveryService = app.get(DiscoveryService);
  await discoveryService.registerService({
    name: 'product-service',
    url: 'http://localhost:3002',
    swaggerUrl: 'http://localhost:3002/api-json',
  });
  console.log('✅ Service Product enregistré auprès du service de découverte');
  console.log('📄 Swagger product-service disponible sur http://localhost:3002/docs');
  console.log('📄 Documentation JSON disponible sur http://localhost:3002/api-json');
}

bootstrap().catch((error) => {
  console.error('❌ Erreur au démarrage du service produit :', error);
}); 