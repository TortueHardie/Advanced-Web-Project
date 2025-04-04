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
exports.UpdateMenuDto = exports.CreateMenuDto = exports.MenuDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const article_dto_1 = require("./article.dto");
class MenuDto {
    id;
    name;
    description;
    price;
    restaurantId;
    items;
}
exports.MenuDto = MenuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du menu' }),
    __metadata("design:type", Number)
], MenuDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du menu' }),
    __metadata("design:type", String)
], MenuDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description du menu' }),
    __metadata("design:type", String)
], MenuDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prix du menu' }),
    __metadata("design:type", Number)
], MenuDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du restaurant' }),
    __metadata("design:type", Number)
], MenuDto.prototype, "restaurantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Articles inclus dans le menu', type: [article_dto_1.ArticleDto] }),
    __metadata("design:type", Array)
], MenuDto.prototype, "items", void 0);
class CreateMenuDto {
    name;
    description;
    price;
    restaurantId;
    itemIds;
}
exports.CreateMenuDto = CreateMenuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du menu' }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description du menu' }),
    __metadata("design:type", String)
], CreateMenuDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prix du menu' }),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du restaurant' }),
    __metadata("design:type", Number)
], CreateMenuDto.prototype, "restaurantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IDs des articles à inclure dans le menu', type: [Number] }),
    __metadata("design:type", Array)
], CreateMenuDto.prototype, "itemIds", void 0);
class UpdateMenuDto {
    name;
    description;
    price;
    itemIds;
}
exports.UpdateMenuDto = UpdateMenuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du menu', required: false }),
    __metadata("design:type", String)
], UpdateMenuDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description du menu', required: false }),
    __metadata("design:type", String)
], UpdateMenuDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prix du menu', required: false }),
    __metadata("design:type", Number)
], UpdateMenuDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IDs des articles à inclure dans le menu', type: [Number], required: false }),
    __metadata("design:type", Array)
], UpdateMenuDto.prototype, "itemIds", void 0);
//# sourceMappingURL=menu.dto.js.map