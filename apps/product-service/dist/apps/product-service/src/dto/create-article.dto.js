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
exports.CreateArticleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateArticleDto {
    name;
    description;
    price;
    type;
    restaurantId;
    stock;
    isAvailable;
}
exports.CreateArticleDto = CreateArticleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nom de l\'article',
        example: 'Burger Classique',
        minLength: 2,
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 100),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description de l\'article',
        example: 'Un burger traditionnel avec salade, tomate et oignon',
        maxLength: 500
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 500),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Prix de l\'article en euros',
        example: 8.99,
        minimum: 0,
        maximum: 1000
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000),
    __metadata("design:type", Number)
], CreateArticleDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type d\'article (ex: Burger, Tacos, Frites...)',
        example: 'Burger',
        minLength: 2,
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 50),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID du restaurant auquel l\'article appartient',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateArticleDto.prototype, "restaurantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stock initial de l\'article',
        example: 100,
        minimum: 0
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateArticleDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Disponibilité initiale de l\'article',
        example: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateArticleDto.prototype, "isAvailable", void 0);
//# sourceMappingURL=create-article.dto.js.map