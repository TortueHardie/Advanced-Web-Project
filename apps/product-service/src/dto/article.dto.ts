import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
  @ApiProperty({ description: 'ID de l\'article' })
  id: string;

  @ApiProperty({ description: 'Nom de l\'article' })
  name: string;

  @ApiProperty({ description: 'Description de l\'article' })
  description: string;

  @ApiProperty({ description: 'Prix de l\'article' })
  price: number;

  @ApiProperty({ description: 'Type de l\'article (Burger, Tacos, Frites...)' })
  type: string;

  @ApiProperty({ description: 'ID du restaurant' })
  restaurantId: string;

  @ApiProperty({ description: 'Stock actuel de l\'article' })
  stock: number;

  @ApiProperty({ description: 'Disponibilité de l\'article' })
  isAvailable: boolean;
}

export class CreateArticleDto {
  @ApiProperty({ description: 'Nom de l\'article' })
  name: string;

  @ApiProperty({ description: 'Description de l\'article' })
  description: string;

  @ApiProperty({ description: 'Prix de l\'article' })
  price: number;

  @ApiProperty({ description: 'Type de l\'article (Burger, Tacos, Frites...)' })
  type: string;

  @ApiProperty({ description: 'ID du restaurant' })
  restaurantId: string;

  @ApiProperty({ description: 'Stock initial de l\'article' })
  stock: number;

  @ApiProperty({ description: 'Disponibilité initiale de l\'article' })
  isAvailable: boolean;
}

export class UpdateArticleDto {
  @ApiProperty({ description: 'Nom de l\'article', required: false })
  name?: string;

  @ApiProperty({ description: 'Description de l\'article', required: false })
  description?: string;

  @ApiProperty({ description: 'Prix de l\'article', required: false })
  price?: number;

  @ApiProperty({ description: 'Type de l\'article (Burger, Tacos, Frites...)', required: false })
  type?: string;

  @ApiProperty({ description: 'Stock de l\'article', required: false })
  stock?: number;

  @ApiProperty({ description: 'Disponibilité de l\'article', required: false })
  isAvailable?: boolean;
} 