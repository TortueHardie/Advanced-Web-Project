import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DiscoveryService } from '@advanced-web/discovery';
import { Express } from 'express';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
    console.log('🔧 Configuration du service de livraison...');
    
    // 🔹 Lancement du microservice TCP
    console.log('📡 Création du microservice TCP...');
    const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,
        options: { host: '0.0.0.0', port: 4003 },
      },
    );
    console.log('✅ Microservice TCP créé, démarrage...');
    await microservice.listen();
    console.log('🚀 Microservice Livraison démarré sur TCP (port 4003)');

    // 🔹 Instance HTTP pour Swagger et API REST
    console.log('📡 Création de l\'application HTTP...');
    const app = await NestFactory.create(AppModule);
    console.log('✅ Application HTTP créée');
    
    // Configuration de Swagger
    console.log('📝 Configuration de Swagger...');
    const config = new DocumentBuilder()
      .setTitle('Service de Livraison')
      .setDescription(`
        API pour la gestion des livraisons de commandes.
        
        ## Fonctionnalités
        
        - Récupération des commandes disponibles pour livraison
        - Acceptation/refus des demandes de livraison
        - Suivi de l'état d'une livraison
        - Consultation des livraisons assignées à un livreur
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
    console.log('✅ Configuration Swagger terminée');
    
    console.log('📝 Création du document Swagger...');
    const document = SwaggerModule.createDocument(app, config);
    console.log('✅ Document Swagger créé');
    
    // Exposer la documentation Swagger au format JSON
    console.log('📝 Configuration des routes pour Swagger...');
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
    console.log('✅ Routes Swagger configurées');

    // Configuration globale
    console.log('⚙️ Configuration globale de l\'application...');
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: false,
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();
    console.log('✅ Configuration globale terminée');

    console.log('🔹 Démarrage du serveur HTTP...');
    await app.listen(3003, '0.0.0.0');
    console.log('✅ Serveur HTTP démarré sur le port 3003');

    // Enregistrement auprès du service de découverte
    try {
      console.log('🔍 Enregistrement auprès du service de découverte...');
      const discoveryService = app.get(DiscoveryService);
      await discoveryService.registerService({
        name: 'delivery-service',
        url: 'http://localhost:3003',
        swaggerUrl: 'http://localhost:3003/api-json',
      });
      console.log('✅ Service Livraison enregistré auprès du service de découverte');
    } catch (error) {
      console.error('⚠️ Erreur lors de l\'enregistrement du service:', error);
      // Continue quand même même si le service discovery échoue
    }
    
    console.log('📄 Swagger delivery-service disponible sur http://localhost:3003/docs');
    console.log('📄 Documentation JSON disponible sur http://localhost:3003/api-json');
    console.log('🚀 Service de livraison complètement démarré et opérationnel');
  } catch (error) {
    console.error('❌ Erreur au démarrage du service livraison:', error);
    process.exit(1);
  }
}

bootstrap(); 