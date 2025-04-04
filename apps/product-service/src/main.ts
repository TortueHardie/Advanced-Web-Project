import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DiscoveryService } from '@advanced-web/discovery';
import { Express } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  
  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('Service de Produits')
    .setDescription('API pour la gestion des restaurants, menus et articles')
    .setVersion('1.0')
    .addTag('Restaurants')
    .addTag('Menus')
    .addTag('Articles')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  
  // Exposer la documentation Swagger au format JSON
  const expressApp = app.getHttpAdapter().getInstance() as Express;
  expressApp.get('/api-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });
  
  // Exposer l'interface Swagger
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
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
  console.log('📄 Swagger product-service disponible sur http://localhost:3002/api');
  console.log('📄 Documentation JSON disponible sur http://localhost:3002/api-json');
}

bootstrap().catch((error) => {
  console.error('❌ Erreur au démarrage du service produit :', error);
}); 