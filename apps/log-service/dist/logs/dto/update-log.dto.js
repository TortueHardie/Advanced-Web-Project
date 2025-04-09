"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateLogDto {
    timestamp;
    method;
    path;
    status;
    ip;
    userId;
    service;
}
exports.UpdateLogDto = UpdateLogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date et heure de l\'événement', required: false, example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], UpdateLogDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Méthode HTTP utilisée', required: false, example: 'GET' }),
    __metadata("design:type", String)
], UpdateLogDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chemin de la requête', required: false, example: '/api/users' }),
    __metadata("design:type", String)
], UpdateLogDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Code de statut HTTP', required: false, example: 200 }),
    __metadata("design:type", Number)
], UpdateLogDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Adresse IP du client', required: false, example: '127.0.0.1' }),
    __metadata("design:type", String)
], UpdateLogDto.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de l\'utilisateur (si authentifié)', required: false, example: '5f8d0e55b54764421b71ddd7' }),
    __metadata("design:type", String)
], UpdateLogDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Service qui a généré le log', required: false, example: 'user-service' }),
    __metadata("design:type", String)
], UpdateLogDto.prototype, "service", void 0);
//# sourceMappingURL=update-log.dto.js.map