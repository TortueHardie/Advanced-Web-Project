import { PrismaService } from '@advanced-web/prisma/src/prisma.service';
import { CreateArticleDto, UpdateArticleDto } from '../dto';
export declare class ArticleRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateArticleDto): Promise<any>;
    findAll(restaurantId: number): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, data: UpdateArticleDto): Promise<any>;
    remove(id: number): Promise<any>;
    updateStock(id: number, stock: number): Promise<any>;
    updateAvailability(id: number, isAvailable: boolean): Promise<any>;
}
