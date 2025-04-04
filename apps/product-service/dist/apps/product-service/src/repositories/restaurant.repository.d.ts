import { PrismaService } from '@advanced-web/prisma/src/prisma.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../dto';
export declare class RestaurantRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateRestaurantDto): Promise<{
        description: string;
        id: number;
        name: string;
        city: string;
        deliveryFees: number;
        status: import(".prisma/client").$Enums.RestaurantStatus;
        ownerId: number | null;
    }>;
    findAll(): Promise<({
        menus: {
            description: string;
            id: number;
            name: string;
            price: number;
            restaurantId: number;
        }[];
        articles: {
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
        city: string;
        deliveryFees: number;
        status: import(".prisma/client").$Enums.RestaurantStatus;
        ownerId: number | null;
    })[]>;
    findOne(id: number): Promise<({
        menus: {
            description: string;
            id: number;
            name: string;
            price: number;
            restaurantId: number;
        }[];
        articles: {
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
        city: string;
        deliveryFees: number;
        status: import(".prisma/client").$Enums.RestaurantStatus;
        ownerId: number | null;
    }) | null>;
    update(id: number, data: UpdateRestaurantDto): Promise<{
        description: string;
        id: number;
        name: string;
        city: string;
        deliveryFees: number;
        status: import(".prisma/client").$Enums.RestaurantStatus;
        ownerId: number | null;
    }>;
    remove(id: number): Promise<{
        description: string;
        id: number;
        name: string;
        city: string;
        deliveryFees: number;
        status: import(".prisma/client").$Enums.RestaurantStatus;
        ownerId: number | null;
    }>;
    findMenus(restaurantId: number): Promise<({
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
