"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const express = require("express");
const http_proxy_middleware_1 = require("http-proxy-middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Gateway')
        .setDescription('Documentation centralisée des microservices')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const proxyApp = express();
    proxyApp.use('/user', (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: { '^/api-docs/user': '/docs' }
    }));
    app.use('/api-docs', proxyApp);
    await app.listen(process.env.PORT ?? 3000);
    console.log(`🚀 API Gateway démarrée sur le port ${process.env.PORT ?? 3000}`);
    console.log(`📄 Swagger de la Gateway : http://localhost:${process.env.PORT ?? 3000}/docs`);
    console.log(`📄 Swagger du User Service via Gateway : http://localhost:${process.env.PORT ?? 3000}/api-docs/user`);
}
bootstrap().catch((error) => {
    console.error('❌ Erreur au démarrage de la Gateway :', error);
});
//# sourceMappingURL=main.js.map