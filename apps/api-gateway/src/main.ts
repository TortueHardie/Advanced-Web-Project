import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
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
    .setTitle('API Gateway - Service Central')
    .setDescription(`
      Point d'entrée unique pour l'ensemble des microservices de l'application.
      
      ## Services disponibles
      
      - **User Service** : Gestion des utilisateurs et de l'authentification
      - **Product Service** : Gestion des restaurants, menus et articles
      - **Delivery Service** : Gestion des livraisons de commandes
      - **Order Service** : Traitement des commandes
      
      ## Authentification
      
      L'API utilise l'authentification par JWT (JSON Web Token). 
      Pour les routes protégées, vous devez fournir un token dans l'en-tête Authorization.
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
    .addTag('Auth', 'Authentification')
    .addTag('Users', 'Gestion des utilisateurs')
    .addTag('Products', 'Gestion des restaurants, menus et articles')
    .addTag('Delivery', 'Gestion des livraisons')
    .addTag('Orders', 'Gestion des commandes')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  console.log(`🚀 API Gateway démarré sur: ${await app.getUrl()}`);
  console.log(`📄 Documentation disponible sur: ${await app.getUrl()}/docs`);
}

bootstrap().catch(error => {
  console.error('❌ Erreur au démarrage de l\'API Gateway:', error);
});
