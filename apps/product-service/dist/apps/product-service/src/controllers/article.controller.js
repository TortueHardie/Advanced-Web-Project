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
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const article_service_1 = require("../services/article.service");
const dto_1 = require("../dto");
const swagger_1 = require("@nestjs/swagger");
let ArticleController = class ArticleController {
    articleService;
    constructor(articleService) {
        this.articleService = articleService;
    }
    async create(createArticleDto) {
        return this.articleService.create(createArticleDto);
    }
    async findAll(restaurantId) {
        return this.articleService.findAll(restaurantId);
    }
    async findOne(id) {
        return this.articleService.findOne(id);
    }
    async update(id, updateArticleDto) {
        return this.articleService.update(id, updateArticleDto);
    }
    async remove(id) {
        return this.articleService.remove(id);
    }
    async updateStock(id, stock) {
        return this.articleService.updateStock(id, stock);
    }
    async updateAvailability(id, isAvailable) {
        return this.articleService.updateAvailability(id, isAvailable);
    }
};
exports.ArticleController = ArticleController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouvel article' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateArticleDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Article créé avec succès',
        type: dto_1.ArticleDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les articles d\'un restaurant' }),
    (0, swagger_1.ApiQuery)({
        name: 'restaurantId',
        description: 'ID du restaurant',
        type: Number
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des articles récupérée avec succès',
        type: [dto_1.ArticleDto]
    }),
    __param(0, (0, common_1.Query)('restaurantId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un article par son ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de l\'article' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Article trouvé',
        type: dto_1.ArticleDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Article non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un article' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de l\'article' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateArticleDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Article mis à jour avec succès',
        type: dto_1.ArticleDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Article non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un article' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de l\'article' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Article supprimé avec succès',
        type: dto_1.ArticleDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Article non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/stock'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour le stock d\'un article' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de l\'article' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                stock: {
                    type: 'number',
                    description: 'Nouvelle valeur du stock',
                    example: 100
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Stock de l\'article mis à jour avec succès',
        type: dto_1.ArticleDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Article non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('stock')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "updateStock", null);
__decorate([
    (0, common_1.Patch)(':id/availability'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour la disponibilité d\'un article' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de l\'article' }),
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
        description: 'Disponibilité de l\'article mise à jour avec succès',
        type: dto_1.ArticleDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Article non trouvé'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('isAvailable')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "updateAvailability", null);
exports.ArticleController = ArticleController = __decorate([
    (0, swagger_1.ApiTags)('Articles'),
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
//# sourceMappingURL=article.controller.js.map