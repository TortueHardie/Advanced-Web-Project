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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const menu_service_1 = require("../services/menu.service");
const dto_1 = require("../dto");
const swagger_1 = require("@nestjs/swagger");
let MenuController = class MenuController {
    menuService;
    constructor(menuService) {
        this.menuService = menuService;
    }
    async create(createMenuDto) {
        return this.menuService.create(createMenuDto);
    }
    async findAll(restaurantId) {
        return this.menuService.findAll(restaurantId);
    }
    async findOne(id) {
        return this.menuService.findOne(id);
    }
    async update(id, updateMenuDto) {
        return this.menuService.update(id, updateMenuDto);
    }
    async remove(id) {
        return this.menuService.remove(id);
    }
    async updateAvailability(id, isAvailable) {
        return this.menuService.updateAvailability(id, isAvailable);
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau menu' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateMenuDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Menu créé avec succès',
        type: dto_1.MenuDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateMenuDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les menus d\'un restaurant' }),
    (0, swagger_1.ApiQuery)({
        name: 'restaurantId',
        description: 'ID du restaurant',
        type: Number
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des menus récupérée avec succès',
        type: [dto_1.MenuDto]
    }),
    __param(0, (0, common_1.Query)('restaurantId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un menu par son ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du menu' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Menu trouvé',
        type: dto_1.MenuDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Menu non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un menu' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du menu' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateMenuDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Menu mis à jour avec succès',
        type: dto_1.MenuDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Menu non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateMenuDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un menu' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du menu' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Menu supprimé avec succès',
        type: dto_1.MenuDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Menu non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/availability'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour la disponibilité d\'un menu' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du menu' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                isAvailable: {
                    type: 'boolean',
                    description: 'Nouvelle valeur de disponibilité',
                    example: true
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Disponibilité du menu mise à jour avec succès',
        type: dto_1.MenuDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Menu non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('isAvailable')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "updateAvailability", null);
exports.MenuController = MenuController = __decorate([
    (0, swagger_1.ApiTags)('Menus'),
    (0, common_1.Controller)('menus'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map