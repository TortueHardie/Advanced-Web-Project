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
exports.RestaurantDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RestaurantDto {
    id;
    name;
    city;
    deliveryFees;
    description;
    status;
    ownerId;
    createdAt;
    updatedAt;
}
exports.RestaurantDto = RestaurantDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identifiant unique du restaurant' }),
    __metadata("design:type", Number)
], RestaurantDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du restaurant' }),
    __metadata("design:type", String)
], RestaurantDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ville du restaurant' }),
    __metadata("design:type", String)
], RestaurantDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Frais de livraison' }),
    __metadata("design:type", Number)
], RestaurantDto.prototype, "deliveryFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description du restaurant' }),
    __metadata("design:type", String)
], RestaurantDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Statut du restaurant', enum: ['ACTIVE', 'INACTIVE'] }),
    __metadata("design:type", String)
], RestaurantDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du propriétaire du restaurant' }),
    __metadata("design:type", Number)
], RestaurantDto.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date de création' }),
    __metadata("design:type", Date)
], RestaurantDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date de mise à jour' }),
    __metadata("design:type", Date)
], RestaurantDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=restaurant.dto.js.map