"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const product_module_1 = require("./product.module");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const discovery_1 = require("@advanced-web/discovery");
async function bootstrap() {
    const app = await core_1.NestFactory.create(product_module_1.ProductModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Product Service API')
        .setDescription('API pour la gestion des restaurants, menus et articles')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(3001);
    const microservice = await core_1.NestFactory.createMicroservice(product_module_1.ProductModule, {
        transport: microservices_1.Transport.TCP,
        options: { host: '127.0.0.1', port: 4002 },
    });
    microservice.listen();
    console.log('🚀 Microservice Product démarré sur TCP (port 4002)');
    const httpApp = await core_1.NestFactory.create(product_module_1.ProductModule);
    const configSwagger = new swagger_1.DocumentBuilder()
        .setTitle('Product Service API')
        .setDescription('Documentation de l\'API Product Service')
        .setVersion('1.0')
        .build();
    const documentSwagger = swagger_1.SwaggerModule.createDocument(httpApp, configSwagger);
    swagger_1.SwaggerModule.setup('docs', httpApp, documentSwagger);
    await httpApp.listen(3002);
    console.log('📄 Swagger product-service disponible sur http://localhost:3002/docs');
    const discoveryService = app.get(discovery_1.DiscoveryService);
    await discoveryService.registerService({
        name: 'product-service',
        url: 'http://localhost:3001',
        swaggerUrl: 'http://localhost:3002/docs-json',
    });
    console.log('✅ Service Product enregistré auprès du service de découverte');
}
bootstrap().catch((error) => {
    console.error('❌ Erreur au démarrage du service produit :', error);
});
//# sourceMappingURL=main.js.map