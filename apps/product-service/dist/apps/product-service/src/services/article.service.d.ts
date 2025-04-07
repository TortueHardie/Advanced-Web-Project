import { ArticleRepository } from '../repositories/article.repository';
import { ArticleDto, CreateArticleDto, UpdateArticleDto } from '../dto';
import { PrismaService } from '@advanced-web/prisma';
export declare class ArticleService {
    private readonly articleRepository;
    private readonly prisma;
    constructor(articleRepository: ArticleRepository, prisma: PrismaService);
    create(createArticleDto: CreateArticleDto): Promise<ArticleDto>;
    findAll(): Promise<ArticleDto[]>;
    findOne(id: number): Promise<ArticleDto>;
    update(id: number, updateArticleDto: UpdateArticleDto): Promise<ArticleDto>;
    remove(id: number): Promise<ArticleDto>;
    findByMenu(menuId: number): Promise<ArticleDto[]>;
    updateStock(id: number, stock: number): Promise<ArticleDto>;
    updateAvailability(id: number, isAvailable: boolean): Promise<ArticleDto>;
}
