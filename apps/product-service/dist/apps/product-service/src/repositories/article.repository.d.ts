import { PrismaService } from '@advanced-web/prisma';
import { CreateArticleDto, UpdateArticleDto } from '../dto';
export declare class ArticleRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateArticleDto): Promise<{
        description: string;
        type: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    }>;
    findAll(): Promise<{
        description: string;
        type: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    }[]>;
    findOne(id: number): Promise<{
        description: string;
        type: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    } | null>;
    update(id: number, data: UpdateArticleDto): Promise<{
        description: string;
        type: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    }>;
    remove(id: number): Promise<{
        description: string;
        type: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    }>;
    findByRestaurant(restaurantId: number): Promise<{
        description: string;
        type: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    }[]>;
}
