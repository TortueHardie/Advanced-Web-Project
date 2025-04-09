"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: 'Authorization,Content-Type,Accept',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Gateway')
        .setDescription('Documentation centralisée des microservices')
        .setVersion('1.0')
        .addTag('Auth', 'Endpoints d\'authentification')
        .addTag('Users', 'Gestion des utilisateurs')
        .addTag('Orders', 'Gestion des commandes')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Entrez votre token JWT ici',
        in: 'header',
    }, 'access-token')
        .addServer('http://localhost:3000', 'Serveur de développement')
        .addServer('https://api.votredomaine.com', 'Serveur de production')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        deepScanRoutes: true,
        ignoreGlobalPrefix: false,
    });
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'none',
            filter: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
    });
    await app.listen(3000, '0.0.0.0');
    console.log(`🚀 API Gateway démarrée sur le port 3000`);
    console.log(`📄 Swagger de la Gateway : http://localhost:3000/docs`);
}
bootstrap().catch((error) => {
    console.error('❌ Erreur au démarrage de la Gateway :', error);
});
//# sourceMappingURL=main.js.map