import { PrismaService } from '@advanced-web/prisma';
import { CreateMenuDto, UpdateMenuDto } from '../dto';
export declare class MenuRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateMenuDto): Promise<{
        items: {
            description: string;
            type: string;
            id: number;
            name: string;
            price: number;
            restaurantId: number;
        }[];
    } & {
        description: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    }>;
    findAll(): Promise<({
        items: {
            description: string;
            type: string;
            id: number;
            name: string;
            price: number;
            restaurantId: number;
        }[];
    } & {
        description: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    })[]>;
    findOne(id: number): Promise<({
        items: {
            description: string;
            type: string;
            id: number;
            name: string;
            price: number;
            restaurantId: number;
        }[];
    } & {
        description: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    }) | null>;
    update(id: number, data: UpdateMenuDto): Promise<{
        items: {
            description: string;
            type: string;
            id: number;
            name: string;
            price: number;
            restaurantId: number;
        }[];
    } & {
        description: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    }>;
    remove(id: number): Promise<{
        items: {
            description: string;
            type: string;
            id: number;
            name: string;
            price: number;
            restaurantId: number;
        }[];
    } & {
        description: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    }>;
    findByRestaurant(restaurantId: number): Promise<({
        items: {
            description: string;
            type: string;
            id: number;
            name: string;
            price: number;
            restaurantId: number;
        }[];
    } & {
        description: string;
        id: number;
        name: string;
        price: number;
        restaurantId: number;
    })[]>;
}
