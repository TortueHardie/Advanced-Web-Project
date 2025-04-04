export declare class ArticleDto {
    id: number;
    name: string;
    description: string;
    price: number;
    type: string;
    restaurantId: number;
}
export declare class CreateArticleDto {
    name: string;
    description: string;
    price: number;
    type: string;
    restaurantId: number;
}
export declare class UpdateArticleDto {
    name?: string;
    description?: string;
    price?: number;
    type?: string;
}
