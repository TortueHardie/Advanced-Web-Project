"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_config_1 = require("./swagger.config");
const dev_auth_token_1 = require("./utils/dev-auth-token");
let DevAuthInterceptor = class DevAuthInterceptor {
    intercept(context, next) {
        if (context.getType() === 'http') {
            const request = context.switchToHttp().getRequest();
            if (!request.headers.authorization && !request.headers.Authorization) {
                console.log('DevAuthInterceptor: Adding test authorization header');
                request.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjk5OSwibmFtZSI6IkFkbWluIFVzZXIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDM2NjY4NjYsImV4cCI6MTc0Mzc1MzI2Nn0.DEV_TEST_SIGNATURE';
            }
        }
        return next.handle();
    }
};
DevAuthInterceptor = __decorate([
    (0, common_1.Injectable)()
], DevAuthInterceptor);
async function bootstrap() {
    const microservice = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: { host: '127.0.0.1', port: 4002 },
    });
    microservice.listen();
    console.log('🚀 Microservice Order démarré sur TCP (port 4002)');
    const httpApp = await core_1.NestFactory.create(app_module_1.AppModule);
    httpApp.enableCors();
    httpApp.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    if (process.env.NODE_ENV !== 'production') {
        httpApp.useGlobalInterceptors(new DevAuthInterceptor());
    }
    const document = swagger_1.SwaggerModule.createDocument(httpApp, swagger_config_1.swaggerConfig, swagger_config_1.swaggerDocumentOptions);
    swagger_1.SwaggerModule.setup('docs', httpApp, document, swagger_config_1.swaggerSetupOptions);
    await httpApp.listen(3002);
    console.log('📄 Swagger order-service disponible sur http://localhost:3002/docs');
    if (process.env.NODE_ENV !== 'production') {
        (0, dev_auth_token_1.printDevelopmentTokens)();
    }
}
bootstrap().catch((error) => {
    console.error('❌ Erreur au démarrage du service de commandes :', error);
});
//# sourceMappingURL=main.js.map