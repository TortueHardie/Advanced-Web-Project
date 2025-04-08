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
exports.CreateRestaurantDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRestaurantDto {
    name;
    city;
    deliveryFees;
    description;
    ownerId;
    address;
    rating;
}
exports.CreateRestaurantDto = CreateRestaurantDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nom du restaurant',
        example: 'Le Petit Bistrot',
        minLength: 2,
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 100),
    __metadata("design:type", String)
], CreateRestaurantDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ville où se trouve le restaurant',
        example: 'Paris',
        minLength: 2,
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 100),
    __metadata("design:type", String)
], CreateRestaurantDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Frais de livraison en euros',
        example: 2.5,
        minimum: 0,
        maximum: 20
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(20),
    __metadata("design:type", Number)
], CreateRestaurantDto.prototype, "deliveryFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description détaillée du restaurant',
        example: 'Un restaurant traditionnel français',
        minLength: 10,
        maxLength: 1000
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(10, 1000),
    __metadata("design:type", String)
], CreateRestaurantDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID du propriétaire du restaurant (doit être un utilisateur avec le rôle RESTAURATEUR)',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateRestaurantDto.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Adresse complète du restaurant',
        example: '123 rue de la Paix',
        minLength: 5,
        maxLength: 200
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(5, 200),
    __metadata("design:type", String)
], CreateRestaurantDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Note moyenne du restaurant (sur 5)',
        example: 4.5,
        minimum: 0,
        maximum: 5,
        required: false
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateRestaurantDto.prototype, "rating", void 0);
//# sourceMappingURL=create-restaurant.dto.js.map