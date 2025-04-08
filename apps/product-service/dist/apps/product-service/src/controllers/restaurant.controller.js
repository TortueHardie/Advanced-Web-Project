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
exports.RestaurantController = void 0;
const common_1 = require("@nestjs/common");
const restaurant_service_1 = require("../services/restaurant.service");
const dto_1 = require("../dto");
const swagger_1 = require("@nestjs/swagger");
let RestaurantController = class RestaurantController {
    restaurantService;
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    async create(createRestaurantDto) {
        return this.restaurantService.create(createRestaurantDto);
    }
    async findAll() {
        return this.restaurantService.findAll();
    }
    async findOne(id) {
        return this.restaurantService.findOne(id);
    }
    async update(id, updateRestaurantDto) {
        return this.restaurantService.update(id, updateRestaurantDto);
    }
    async remove(id) {
        return this.restaurantService.remove(id);
    }
    async findMenus(id) {
        return this.restaurantService.findMenus(id);
    }
};
exports.RestaurantController = RestaurantController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau restaurant' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateRestaurantDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Restaurant créé avec succès',
        type: dto_1.RestaurantDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateRestaurantDto]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les restaurants' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des restaurants récupérée avec succès',
        type: [dto_1.RestaurantDto]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un restaurant par son ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du restaurant' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Restaurant trouvé',
        type: dto_1.RestaurantDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Restaurant non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un restaurant' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du restaurant' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateRestaurantDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Restaurant mis à jour avec succès',
        type: dto_1.RestaurantDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Restaurant non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateRestaurantDto]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un restaurant' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du restaurant' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Restaurant supprimé avec succès',
        type: dto_1.RestaurantDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Restaurant non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/menus'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les menus d\'un restaurant' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du restaurant' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des menus récupérée avec succès',
        type: [dto_1.MenuDto]
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Restaurant non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "findMenus", null);
exports.RestaurantController = RestaurantController = __decorate([
    (0, swagger_1.ApiTags)('Restaurants'),
    (0, common_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [restaurant_service_1.RestaurantService])
], RestaurantController);
//# sourceMappingURL=restaurant.controller.js.map