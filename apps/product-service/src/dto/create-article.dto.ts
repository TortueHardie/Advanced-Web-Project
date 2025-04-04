import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ description: 'Nom de l\'article', example: 'Burger Classique' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description de l\'article', example: 'Un burger traditionnel avec salade, tomate et oignon' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Prix de l\'article', example: 8.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Type d\'article', example: 'Burger' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'ID du restaurant', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({ description: 'Stock initial', example: 100 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ description: 'Disponibilité initiale', example: true })
  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean;

  @ApiProperty({ description: 'ID du menu', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  menuId: number;
} 