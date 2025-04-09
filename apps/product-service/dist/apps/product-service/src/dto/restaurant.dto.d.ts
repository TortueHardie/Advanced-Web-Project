import { MenuDto } from './menu.dto';
import { ArticleDto } from './article.dto';
export declare enum RestaurantStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class RestaurantDto {
    id: number;
    name: string;
    city: string;
    deliveryFees: number;
    description: string;
    status: RestaurantStatus;
    ownerId?: number;
    menus?: MenuDto[];
    articles?: ArticleDto[];
}
export declare class CreateRestaurantDto {
    name: string;
    city: string;
    deliveryFees: number;
    description: string;
    ownerId?: number;
}
export declare class UpdateRestaurantDto {
    name?: string;
    city?: string;
    deliveryFees?: number;
    description?: string;
    status?: RestaurantStatus;
}
