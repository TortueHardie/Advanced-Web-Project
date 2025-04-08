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
exports.UpdateRestaurantDto = exports.CreateRestaurantDto = exports.RestaurantDto = exports.RestaurantStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const menu_dto_1 = require("./menu.dto");
const article_dto_1 = require("./article.dto");
var RestaurantStatus;
(function (RestaurantStatus) {
    RestaurantStatus["ACTIVE"] = "ACTIVE";
    RestaurantStatus["INACTIVE"] = "INACTIVE";
})(RestaurantStatus || (exports.RestaurantStatus = RestaurantStatus = {}));
class RestaurantDto {
    id;
    name;
    city;
    deliveryFees;
    description;
    status;
    ownerId;
    menus;
    articles;
}
exports.RestaurantDto = RestaurantDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du restaurant' }),
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
    (0, swagger_1.ApiProperty)({ description: 'Statut du restaurant', enum: RestaurantStatus }),
    __metadata("design:type", String)
], RestaurantDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du propriétaire', required: false }),
    __metadata("design:type", Number)
], RestaurantDto.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Menus du restaurant', type: [menu_dto_1.MenuDto], required: false }),
    __metadata("design:type", Array)
], RestaurantDto.prototype, "menus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Articles du restaurant', type: [article_dto_1.ArticleDto], required: false }),
    __metadata("design:type", Array)
], RestaurantDto.prototype, "articles", void 0);
class CreateRestaurantDto {
    name;
    city;
    deliveryFees;
    description;
    ownerId;
}
exports.CreateRestaurantDto = CreateRestaurantDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du restaurant' }),
    __metadata("design:type", String)
], CreateRestaurantDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ville du restaurant' }),
    __metadata("design:type", String)
], CreateRestaurantDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Frais de livraison' }),
    __metadata("design:type", Number)
], CreateRestaurantDto.prototype, "deliveryFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description du restaurant' }),
    __metadata("design:type", String)
], CreateRestaurantDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du propriétaire', required: false }),
    __metadata("design:type", Number)
], CreateRestaurantDto.prototype, "ownerId", void 0);
class UpdateRestaurantDto {
    name;
    city;
    deliveryFees;
    description;
    status;
}
exports.UpdateRestaurantDto = UpdateRestaurantDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du restaurant', required: false }),
    __metadata("design:type", String)
], UpdateRestaurantDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ville du restaurant', required: false }),
    __metadata("design:type", String)
], UpdateRestaurantDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Frais de livraison', required: false }),
    __metadata("design:type", Number)
], UpdateRestaurantDto.prototype, "deliveryFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description du restaurant', required: false }),
    __metadata("design:type", String)
], UpdateRestaurantDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Statut du restaurant', enum: RestaurantStatus, required: false }),
    __metadata("design:type", String)
], UpdateRestaurantDto.prototype, "status", void 0);
//# sourceMappingURL=restaurant.dto.js.map