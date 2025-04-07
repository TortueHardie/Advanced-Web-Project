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
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const article_repository_1 = require("../repositories/article.repository");
const prisma_1 = require("@advanced-web/prisma");
let ArticleService = class ArticleService {
    articleRepository;
    prisma;
    constructor(articleRepository, prisma) {
        this.articleRepository = articleRepository;
        this.prisma = prisma;
    }
    async create(createArticleDto) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: createArticleDto.restaurantId },
        });
        if (!restaurant) {
            throw new common_1.BadRequestException(`Le restaurant #${createArticleDto.restaurantId} n'existe pas`);
        }
        if (createArticleDto.stock === 0 && createArticleDto.isAvailable) {
            throw new common_1.BadRequestException('Un article ne peut pas être disponible avec un stock de 0');
        }
        return this.articleRepository.create(createArticleDto);
    }
    async findAll() {
        return this.articleRepository.findAll();
    }
    async findOne(id) {
        const article = await this.articleRepository.findOne(id);
        if (!article) {
            throw new common_1.NotFoundException(`L'article #${id} n'existe pas`);
        }
        return article;
    }
    async update(id, updateArticleDto) {
        const article = await this.findOne(id);
        if (updateArticleDto.stock !== undefined && updateArticleDto.isAvailable !== undefined) {
            if (updateArticleDto.stock === 0 && updateArticleDto.isAvailable) {
                throw new common_1.BadRequestException('Un article ne peut pas être disponible avec un stock de 0');
            }
        }
        else if (updateArticleDto.stock !== undefined) {
            if (updateArticleDto.stock === 0 && article.isAvailable) {
                throw new common_1.BadRequestException('Un article ne peut pas être disponible avec un stock de 0');
            }
        }
        else if (updateArticleDto.isAvailable !== undefined) {
            if (article.stock === 0 && updateArticleDto.isAvailable) {
                throw new common_1.BadRequestException('Un article ne peut pas être disponible avec un stock de 0');
            }
        }
        return this.articleRepository.update(id, updateArticleDto);
    }
    async remove(id) {
        const article = await this.findOne(id);
        const menus = await this.prisma.menu.findMany({
            where: {
                items: {
                    some: {
                        id: article.id
                    }
                }
            }
        });
        if (menus.length > 0) {
            throw new common_1.BadRequestException(`L'article #${id} est utilisé dans ${menus.length} menu(x) et ne peut pas être supprimé`);
        }
        return this.articleRepository.remove(id);
    }
    async findByMenu(menuId) {
        const menu = await this.prisma.menu.findUnique({
            where: { id: menuId },
        });
        if (!menu) {
            throw new common_1.NotFoundException(`Le menu #${menuId} n'existe pas`);
        }
        return this.articleRepository.findByMenu(menuId);
    }
    async updateStock(id, stock) {
        const article = await this.findOne(id);
        if (stock === 0 && article.isAvailable) {
            throw new common_1.BadRequestException('Un article ne peut pas être disponible avec un stock de 0');
        }
        return this.articleRepository.updateStock(id, stock);
    }
    async updateAvailability(id, isAvailable) {
        const article = await this.findOne(id);
        if (article.stock === 0 && isAvailable) {
            throw new common_1.BadRequestException('Un article ne peut pas être disponible avec un stock de 0');
        }
        return this.articleRepository.updateAvailability(id, isAvailable);
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [article_repository_1.ArticleRepository,
        prisma_1.PrismaService])
], ArticleService);
//# sourceMappingURL=article.service.js.map