import { ArticleDto } from './article.dto';
export declare class MenuDto {
    id: number;
    name: string;
    description: string;
    price: number;
    restaurantId: number;
    items: ArticleDto[];
    isAvailable: boolean;
}
export declare class CreateMenuDto {
    name: string;
    description: string;
    price: number;
    restaurantId: number;
    itemIds: number[];
    isAvailable?: boolean;
}
export declare class UpdateMenuDto {
    name?: string;
    description?: string;
    price?: number;
    itemIds?: number[];
    isAvailable?: boolean;
}
