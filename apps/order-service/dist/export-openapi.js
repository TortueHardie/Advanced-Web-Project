"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const fs_1 = require("fs");
const path_1 = require("path");
const swagger_config_1 = require("./swagger.config");
async function exportOpenAPI() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_config_1.swaggerConfig, swagger_config_1.swaggerDocumentOptions);
    const outputPath = (0, path_1.join)(process.cwd(), 'openapi-spec.json');
    (0, fs_1.writeFileSync)(outputPath, JSON.stringify(document, null, 2), { encoding: 'utf8' });
    console.log(`✅ Documentation OpenAPI exportée vers: ${outputPath}`);
    await app.close();
}
exportOpenAPI().catch(err => {
    console.error('❌ Erreur lors de l\'export de la documentation OpenAPI:', err);
    process.exit(1);
});
//# sourceMappingURL=export-openapi.js.map