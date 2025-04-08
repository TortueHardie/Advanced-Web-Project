import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration CORS
  app.enableCors({
    origin: true, // Permet toutes les origines en développement
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Authorization,Content-Type,Accept',
  });

  // 🔹 Swagger pour la Gateway - Configuration améliorée
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Documentation centralisée des microservices')
    .setVersion('1.0')
    .addTag('Auth', 'Endpoints d\'authentification')
    .addTag('Users', 'Gestion des utilisateurs')
    .addTag('Orders', 'Gestion des commandes')
    .addTag('Products', 'Gestion des restaurants, menus et articles')
    .addTag('Delivery', 'Gestion des livraisons')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Entrez votre token JWT ici',
        in: 'header',
      },
      'access-token', // Identifiant unique pour ce schéma de sécurité
    )
    .addServer('http://localhost:3000', 'Serveur de développement')
    .addServer('https://api.votredomaine.com', 'Serveur de production')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    ignoreGlobalPrefix: false,
  });
  
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  // 🔹 Le routage est maintenant entièrement géré par NGINX
  // Les proxys Express ont été supprimés pour éviter les redondances et
  // les incohérences potentielles dans la configuration de sécurité.
  // Toutes les routes sont configurées dans le fichier nginx.conf

  // Démarrer l'application sur localhost:3000 pour que Nginx puisse y accéder
  await app.listen(3000, '0.0.0.0');
  console.log(`🚀 API Gateway démarrée sur le port 3000`);
  console.log(`📄 Swagger de la Gateway : http://localhost:3000/docs`);
}

bootstrap().catch((error) => {
  console.error('❌ Erreur au démarrage de la Gateway :', error);
});
