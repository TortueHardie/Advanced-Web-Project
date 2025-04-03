import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { swaggerConfig, swaggerDocumentOptions, swaggerSetupOptions } from './swagger.config';
import { printDevelopmentTokens } from './utils/dev-auth-token';

// Development-only interceptor to support testing without authentication
@Injectable()
class DevAuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Only apply in HTTP context
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      
      // Add default auth header if none is provided
      if (!request.headers.authorization && !request.headers.Authorization) {
        console.log('DevAuthInterceptor: Adding test authorization header');
        // Add a valid admin token for development and testing
        request.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjk5OSwibmFtZSI6IkFkbWluIFVzZXIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDM2NjY4NjYsImV4cCI6MTc0Mzc1MzI2Nn0.DEV_TEST_SIGNATURE';
      }
    }
    return next.handle();
  }
}

async function bootstrap() {
  // 🔹 Lancement du microservice TCP
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 4002 }, // Using port 4002 for order service
    },
  );
  microservice.listen();
  console.log('🚀 Microservice Order démarré sur TCP (port 4002)');

  // 🔹 Instance HTTP pour Swagger
  const httpApp = await NestFactory.create(AppModule);
  httpApp.enableCors();
  
  // Global validation pipe
  httpApp.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  
  // Add development interceptor for auth if not in production
  if (process.env.NODE_ENV !== 'production') {
    httpApp.useGlobalInterceptors(new DevAuthInterceptor());
  }
  
  const document = SwaggerModule.createDocument(httpApp, swaggerConfig, swaggerDocumentOptions);
  SwaggerModule.setup('docs', httpApp, document, swaggerSetupOptions);

  await httpApp.listen(3002); // Serveur HTTP pour Swagger
  console.log('📄 Swagger order-service disponible sur http://localhost:3002/docs');
  
  // Afficher les tokens de développement si on est en mode développement
  if (process.env.NODE_ENV !== 'production') {
    printDevelopmentTokens();
  }
}

bootstrap().catch((error) => {
  console.error('❌ Erreur au démarrage du service de commandes :', error);
}); 