import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  try {
    // 🔹 Lancement du microservice TCP
    const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,
        options: { host: '0.0.0.0', port: 4003 },
      },
    );
    await microservice.listen();
    console.log('🚀 Microservice Livraison démarré sur TCP (port 4003)');

    // 🔹 Instance HTTP pour Swagger et API REST
    const app = await NestFactory.create(AppModule);
    
    // Configuration globale
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: false,
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();

    // Configuration Swagger
    const config = new DocumentBuilder()
      .setTitle('Service de Livraison')
      .setDescription('API pour la gestion des livraisons de commandes')
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
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    
    // Endpoint de santé
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.get('/health', (req, res) => {
      res.status(200).json({ status: 'ok' });
    });
    
    // Exposer l'interface Swagger
    SwaggerModule.setup('docs', app, document);

    await app.listen(3003, '0.0.0.0');
    console.log('📄 Swagger delivery-service disponible sur http://localhost:3003/docs');
    console.log('🚀 Service de livraison démarré sur HTTP (port 3003)');
  } catch (error) {
    console.error('❌ Erreur au démarrage du service livraison:', error);
    process.exit(1);
  }
}

bootstrap(); 