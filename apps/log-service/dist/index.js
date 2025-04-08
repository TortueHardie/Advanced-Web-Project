"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3004;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Configuration de Swagger
(0, swagger_1.setupSwagger)(app);
// Utiliser les routes
app.use('/', routes_1.default);
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Logging service listening on port ${PORT}`);
});
