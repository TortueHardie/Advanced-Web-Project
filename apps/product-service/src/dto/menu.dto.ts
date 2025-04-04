import { ApiProperty } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';

export class MenuDto {
  @ApiProperty({ description: 'Identifiant unique du menu' })
  id: number;

  @ApiProperty({ description: 'Nom du menu' })
  name: string;

  @ApiProperty({ description: 'Description du menu' })
  description: string;

  @ApiProperty({ description: 'Prix du menu' })
  price: number;

  @ApiProperty({ description: 'ID du restaurant' })
  restaurantId: number;

  @ApiProperty({ description: 'Articles du menu', type: [ArticleDto] })
  items: ArticleDto[];

  @ApiProperty({ description: 'Date de création' })
  createdAt: Date;

  @ApiProperty({ description: 'Date de mise à jour' })
  updatedAt: Date;
} 