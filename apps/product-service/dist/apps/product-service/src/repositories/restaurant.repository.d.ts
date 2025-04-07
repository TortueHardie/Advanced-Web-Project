import { PrismaService } from '@advanced-web/prisma';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../dto';
export declare class RestaurantRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateRestaurantDto): Promise<{
        id: number;
        name: string;
        city: string;
        deliveryFees: number;
        description: string;
        status: import(".prisma/client").$Enums.RestaurantStatus;
        ownerId: number | null;
    }>;
    findAll(): Promise<({
        menus: {
            id: number;
            name: string;
            description: string;
            price: number;
            isAvailable: boolean;
            restaurantId: number;
        }[];
        articles: {
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
        city: string;
        deliveryFees: number;
        description: string;
        status: import(".prisma/client").$Enums.RestaurantStatus;
        ownerId: number | null;
    })[]>;
    findOne(id: number): Promise<({
        menus: {
            id: number;
            name: string;
            description: string;
            price: number;
            isAvailable: boolean;
            restaurantId: number;
        }[];
        articles: {
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
        city: string;
        deliveryFees: number;
        description: string;
        status: import(".prisma/client").$Enums.RestaurantStatus;
        ownerId: number | null;
    }) | null>;
    update(id: number, data: UpdateRestaurantDto): Promise<{
        id: number;
        name: string;
        city: string;
        deliveryFees: number;
        description: string;
        status: import(".prisma/client").$Enums.RestaurantStatus;
        ownerId: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        city: string;
        deliveryFees: number;
        description: string;
        status: import(".prisma/client").$Enums.RestaurantStatus;
        ownerId: number | null;
    }>;
    findMenus(restaurantId: number): Promise<({
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
