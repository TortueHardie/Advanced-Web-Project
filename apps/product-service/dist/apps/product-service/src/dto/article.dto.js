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
exports.UpdateArticleDto = exports.CreateArticleDto = exports.ArticleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ArticleDto {
    id;
    name;
    description;
    price;
    type;
    restaurantId;
}
exports.ArticleDto = ArticleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de l\'article' }),
    __metadata("design:type", Number)
], ArticleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom de l\'article' }),
    __metadata("design:type", String)
], ArticleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description de l\'article' }),
    __metadata("design:type", String)
], ArticleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prix de l\'article' }),
    __metadata("design:type", Number)
], ArticleDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type de l\'article (Burger, Tacos, Frites...)' }),
    __metadata("design:type", String)
], ArticleDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du restaurant' }),
    __metadata("design:type", Number)
], ArticleDto.prototype, "restaurantId", void 0);
class CreateArticleDto {
    name;
    description;
    price;
    type;
    restaurantId;
}
exports.CreateArticleDto = CreateArticleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom de l\'article' }),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description de l\'article' }),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prix de l\'article' }),
    __metadata("design:type", Number)
], CreateArticleDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type de l\'article (Burger, Tacos, Frites...)' }),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du restaurant' }),
    __metadata("design:type", Number)
], CreateArticleDto.prototype, "restaurantId", void 0);
class UpdateArticleDto {
    name;
    description;
    price;
    type;
}
exports.UpdateArticleDto = UpdateArticleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom de l\'article', required: false }),
    __metadata("design:type", String)
], UpdateArticleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description de l\'article', required: false }),
    __metadata("design:type", String)
], UpdateArticleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prix de l\'article', required: false }),
    __metadata("design:type", Number)
], UpdateArticleDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type de l\'article (Burger, Tacos, Frites...)', required: false }),
    __metadata("design:type", String)
], UpdateArticleDto.prototype, "type", void 0);
//# sourceMappingURL=article.dto.js.map