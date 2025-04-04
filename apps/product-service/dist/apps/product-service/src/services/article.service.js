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
let ArticleService = class ArticleService {
    articleRepository;
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }
    async create(createArticleDto) {
        return this.articleRepository.create(createArticleDto);
    }
    async findAll(restaurantId) {
        return this.articleRepository.findAll(restaurantId);
    }
    async findOne(id) {
        const article = await this.articleRepository.findOne(id);
        if (!article) {
            throw new common_1.NotFoundException(`Article with ID ${id} not found`);
        }
        return article;
    }
    async update(id, updateArticleDto) {
        await this.findOne(id);
        return this.articleRepository.update(id, updateArticleDto);
    }
    async remove(id) {
        await this.findOne(id);
        return this.articleRepository.remove(id);
    }
    async updateStock(id, stock) {
        await this.findOne(id);
        return this.articleRepository.updateStock(id, stock);
    }
    async updateAvailability(id, isAvailable) {
        await this.findOne(id);
        return this.articleRepository.updateAvailability(id, isAvailable);
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [article_repository_1.ArticleRepository])
], ArticleService);
//# sourceMappingURL=article.service.js.map