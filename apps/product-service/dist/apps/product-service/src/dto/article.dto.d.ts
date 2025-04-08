export declare class ArticleDto {
    id: number;
    name: string;
    description: string;
    price: number;
    type: string;
    restaurantId: number;
    stock: number;
    isAvailable: boolean;
}
export declare class CreateArticleDto {
    name: string;
    description: string;
    price: number;
    type: string;
    restaurantId: number;
    stock: number;
    isAvailable: boolean;
}
export declare class UpdateArticleDto {
    name?: string;
    description?: string;
    price?: number;
    type?: string;
    stock?: number;
    isAvailable?: boolean;
}
