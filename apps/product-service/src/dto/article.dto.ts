import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
  @ApiProperty({ description: 'Identifiant unique de l\'article' })
  id: number;

  @ApiProperty({ description: 'Nom de l\'article' })
  name: string;

  @ApiProperty({ description: 'Description de l\'article' })
  description: string;

  @ApiProperty({ description: 'Prix de l\'article' })
  price: number;

  @ApiProperty({ description: 'Type d\'article' })
  type: string;

  @ApiProperty({ description: 'ID du restaurant' })
  restaurantId: number;

  @ApiProperty({ description: 'Stock disponible' })
  stock: number;

  @ApiProperty({ description: 'Disponibilité de l\'article' })
  isAvailable: boolean;

  @ApiProperty({ description: 'Date de création' })
  createdAt: Date;

  @ApiProperty({ description: 'Date de mise à jour' })
  updatedAt: Date;
} 