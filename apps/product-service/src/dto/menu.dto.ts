import { ApiProperty } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';

export class MenuDto {
  @ApiProperty({ description: 'ID du menu' })
  id: number;

  @ApiProperty({ description: 'Nom du menu' })
  name: string;

  @ApiProperty({ description: 'Description du menu' })
  description: string;

  @ApiProperty({ description: 'Prix du menu' })
  price: number;

  @ApiProperty({ description: 'ID du restaurant' })
  restaurantId: number;

  @ApiProperty({ description: 'Articles inclus dans le menu', type: [ArticleDto] })
  items: ArticleDto[];
}

export class CreateMenuDto {
  @ApiProperty({ description: 'Nom du menu' })
  name: string;

  @ApiProperty({ description: 'Description du menu' })
  description: string;

  @ApiProperty({ description: 'Prix du menu' })
  price: number;

  @ApiProperty({ description: 'ID du restaurant' })
  restaurantId: number;

  @ApiProperty({ description: 'IDs des articles à inclure dans le menu', type: [Number] })
  itemIds: number[];
}

export class UpdateMenuDto {
  @ApiProperty({ description: 'Nom du menu', required: false })
  name?: string;

  @ApiProperty({ description: 'Description du menu', required: false })
  description?: string;

  @ApiProperty({ description: 'Prix du menu', required: false })
  price?: number;

  @ApiProperty({ description: 'IDs des articles à inclure dans le menu', type: [Number], required: false })
  itemIds?: number[];
} 