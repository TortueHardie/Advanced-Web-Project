"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const setupSwagger = (app) => {
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API de Service de Logs',
                version: '1.0.0',
                description: 'API pour gérer les logs de l\'application',
            },
            servers: [
                {
                    url: 'http://localhost:3004',
                    description: 'Serveur de développement',
                },
            ],
        },
        apis: ['./src/routes.ts', './src/controllers/*.ts'],
    };
    const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log('Documentation Swagger disponible à l\'adresse: http://localhost:3004/docs');
};
exports.setupSwagger = setupSwagger;
