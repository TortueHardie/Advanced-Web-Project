"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const product_module_1 = require("./product.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const discovery_1 = require("@advanced-web/discovery");
const http_exception_filter_1 = require("./filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(product_module_1.ProductModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Service de Produits')
        .setDescription('API pour la gestion des restaurants, menus et articles')
        .setVersion('1.0')
        .addTag('Restaurants')
        .addTag('Menus')
        .addTag('Articles')
        .addTag('Health')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.get('/api-json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(document);
    });
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.enableCors();
    await app.listen(3002);
    const discoveryService = app.get(discovery_1.DiscoveryService);
    await discoveryService.registerService({
        name: 'product-service',
        url: 'http://localhost:3002',
        swaggerUrl: 'http://localhost:3002/api-json',
    });
    console.log('✅ Service Product enregistré auprès du service de découverte');
    console.log('📄 Swagger product-service disponible sur http://localhost:3002/api');
    console.log('📄 Documentation JSON disponible sur http://localhost:3002/api-json');
}
bootstrap().catch((error) => {
    console.error('❌ Erreur au démarrage du service produit :', error);
});
//# sourceMappingURL=main.js.map