import { ArticleDto } from './article.dto';
export declare class MenuDto {
    id: number;
    name: string;
    description: string;
    price: number;
    restaurantId: number;
    items: ArticleDto[];
    createdAt: Date;
    updatedAt: Date;
}
