import { ArticleRepository } from '../repositories/article.repository';
import { ArticleDto, CreateArticleDto, UpdateArticleDto } from '../dto';
export declare class ArticleService {
    private readonly articleRepository;
    constructor(articleRepository: ArticleRepository);
    create(createArticleDto: CreateArticleDto): Promise<ArticleDto>;
    findAll(): Promise<ArticleDto[]>;
    findOne(id: number): Promise<ArticleDto>;
    update(id: number, updateArticleDto: UpdateArticleDto): Promise<ArticleDto>;
    remove(id: number): Promise<ArticleDto>;
    findByRestaurant(restaurantId: number): Promise<ArticleDto[]>;
    updateStock(id: number, stock: number): Promise<ArticleDto>;
    updateAvailability(id: number, isAvailable: boolean): Promise<ArticleDto>;
}
