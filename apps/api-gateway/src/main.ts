import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Swagger pour la Gateway
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Documentation centralisée des microservices')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 🔹 Proxy Express pour les services
  const proxyApp = express();
  
  // Proxy pour le service utilisateur
  proxyApp.use('/user', createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || 'http://user-service:3001',
    changeOrigin: true,
    pathRewrite: { '^/user': '/' }
  }));

  // Proxy pour le service d'authentification
  proxyApp.use('/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL || 'http://auth-service:3001',
    changeOrigin: true,
    pathRewrite: { '^/auth': '/' }
  }));

  // Ajout du proxy à NestJS
  app.use('/api', proxyApp);

  // Démarrer l'application sur localhost:3000 pour que Nginx puisse y accéder
  await app.listen(3000, '0.0.0.0');
  console.log(`🚀 API Gateway démarrée sur le port 3000`);
  console.log(`📄 Swagger de la Gateway : http://localhost:3000/docs`);
}

bootstrap().catch((error) => {
  console.error('❌ Erreur au démarrage de la Gateway :', error);
});
