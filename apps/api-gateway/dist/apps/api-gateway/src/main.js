"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: false,
        forbidNonWhitelisted: false,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
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
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Entrez votre token JWT',
        in: 'header',
    }, 'access-token')
        .addTag('Auth', 'Authentification')
        .addTag('Users', 'Gestion des utilisateurs')
        .addTag('Products', 'Gestion des restaurants, menus et articles')
        .addTag('Delivery', 'Gestion des livraisons')
        .addTag('Orders', 'Gestion des commandes')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(3000);
    console.log(`🚀 API Gateway démarré sur: ${await app.getUrl()}`);
    console.log(`📄 Documentation disponible sur: ${await app.getUrl()}/docs`);
}
bootstrap().catch(error => {
    console.error('❌ Erreur au démarrage de l\'API Gateway:', error);
});
//# sourceMappingURL=main.js.map