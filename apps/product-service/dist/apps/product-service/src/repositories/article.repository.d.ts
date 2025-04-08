import { PrismaService } from '@advanced-web/prisma';
import { CreateArticleDto, UpdateArticleDto } from '../dto';
export declare class ArticleRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateArticleDto): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
        type: string;
        stock: number;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
        type: string;
        stock: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
        type: string;
        stock: number;
    } | null>;
    update(id: number, data: UpdateArticleDto): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
        type: string;
        stock: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
        type: string;
        stock: number;
    }>;
    findByMenu(menuId: number): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
        type: string;
        stock: number;
    }[]>;
    updateStock(id: number, stock: number): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
        type: string;
        stock: number;
    }>;
    updateAvailability(id: number, isAvailable: boolean): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
        type: string;
        stock: number;
    }>;
}
