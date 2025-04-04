import { ArticleRepository } from '../repositories/article.repository';
import { CreateArticleDto, UpdateArticleDto, ArticleDto } from '../dto';
export declare class ArticleService {
    private readonly articleRepository;
    constructor(articleRepository: ArticleRepository);
    create(createArticleDto: CreateArticleDto): Promise<ArticleDto>;
    findAll(restaurantId: number): Promise<ArticleDto[]>;
    findOne(id: number): Promise<ArticleDto>;
    update(id: number, updateArticleDto: UpdateArticleDto): Promise<ArticleDto>;
    remove(id: number): Promise<ArticleDto>;
    updateStock(id: number, stock: number): Promise<ArticleDto>;
    updateAvailability(id: number, isAvailable: boolean): Promise<ArticleDto>;
}
