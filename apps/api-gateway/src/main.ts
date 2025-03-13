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
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 🔹 Proxy Express pour Swagger du User Service
  const proxyApp = express();
  proxyApp.use('/user', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: { '^/api-docs/user': '/docs' }
  }));

  // Ajout du proxy à NestJS
  app.use('/api-docs', proxyApp);

  // Démarrer l'application
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 API Gateway démarrée sur le port ${process.env.PORT ?? 3000}`);
  console.log(`📄 Swagger de la Gateway : http://localhost:${process.env.PORT ?? 3000}/docs`);
  console.log(`📄 Swagger du User Service via Gateway : http://localhost:${process.env.PORT ?? 3000}/api-docs/user`);
}

bootstrap().catch((error) => {
  console.error('❌ Erreur au démarrage de la Gateway :', error);
});
