import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // 🔹 Lancement du microservice TCP
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: '0.0.0.0', port: 4001 },
    },
  );
  microservice.listen();
  console.log('🚀 Microservice User démarré sur TCP (port 4001)');

  // 🔹 Instance HTTP pour Swagger
  const httpApp = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription("Documentation de l'API User Service")
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(httpApp as any, config);
  SwaggerModule.setup('docs', httpApp as any, document);

  await httpApp.listen(3001, '0.0.0.0'); // Serveur HTTP pour Swagger
  console.log('📄 Swagger user-service disponible sur http://localhost:3001/docs');
}

bootstrap().catch((error) => {
  console.error('❌ Erreur au démarrage du service utilisateur :', error);
});

