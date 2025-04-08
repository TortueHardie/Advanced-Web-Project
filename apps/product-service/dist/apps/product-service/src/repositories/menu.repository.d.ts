import { PrismaService } from '@advanced-web/prisma';
import { CreateMenuDto, UpdateMenuDto } from '../dto';
export declare class MenuRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateMenuDto): Promise<{
        items: {
            id: number;
            name: string;
            description: string;
            price: number;
            isAvailable: boolean;
            restaurantId: number;
            type: string;
            stock: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
    }>;
    findAll(): Promise<({
        items: {
            id: number;
            name: string;
            description: string;
            price: number;
            isAvailable: boolean;
            restaurantId: number;
            type: string;
            stock: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
    })[]>;
    findOne(id: number): Promise<({
        items: {
            id: number;
            name: string;
            description: string;
            price: number;
            isAvailable: boolean;
            restaurantId: number;
            type: string;
            stock: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
    }) | null>;
    update(id: number, data: UpdateMenuDto): Promise<{
        items: {
            id: number;
            name: string;
            description: string;
            price: number;
            isAvailable: boolean;
            restaurantId: number;
            type: string;
            stock: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
    }>;
    remove(id: number): Promise<{
        items: {
            id: number;
            name: string;
            description: string;
            price: number;
            isAvailable: boolean;
            restaurantId: number;
            type: string;
            stock: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
    }>;
    findByRestaurant(restaurantId: number): Promise<({
        items: {
            id: number;
            name: string;
            description: string;
            price: number;
            isAvailable: boolean;
            restaurantId: number;
            type: string;
            stock: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        price: number;
        isAvailable: boolean;
        restaurantId: number;
    })[]>;
}
