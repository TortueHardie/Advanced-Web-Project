import { ApiProperty } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class MenuDto {
  @ApiProperty({ description: 'ID du menu' })
  id: string;

  @ApiProperty({ description: 'Nom du menu' })
  name: string;

  @ApiProperty({ description: 'Description du menu' })
  description: string;

  @ApiProperty({ description: 'Prix du menu' })
  price: number;

  @ApiProperty({ description: 'ID du restaurant' })
  restaurantId: string;

  @ApiProperty({ description: 'Articles inclus dans le menu', type: [ArticleDto] })
  items: ArticleDto[];

  @ApiProperty({ description: 'Disponibilité du menu' })
  isAvailable: boolean;
}

export class CreateMenuDto {
  @ApiProperty({ description: 'Nom du menu' })
  name: string;

  @ApiProperty({ description: 'Description du menu' })
  description: string;

  @ApiProperty({ description: 'Prix du menu' })
  price: number;

  @ApiProperty({ description: 'ID du restaurant' })
  @IsString()
  restaurantId: string;

  @ApiProperty({ description: 'IDs des articles à inclure dans le menu', type: [String] })
  @IsArray()
  @IsString({ each: true })
  itemIds: string[];

  @ApiProperty({ description: 'Disponibilité du menu', default: true })
  isAvailable?: boolean;
}

export class UpdateMenuDto {
  @ApiProperty({ description: 'Nom du menu', required: false })
  name?: string;

  @ApiProperty({ description: 'Description du menu', required: false })
  description?: string;

  @ApiProperty({ description: 'Prix du menu', required: false })
  price?: number;

  @ApiProperty({ description: 'IDs des articles à inclure dans le menu', type: [String], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  itemIds?: string[];

  @ApiProperty({ description: 'Disponibilité du menu', required: false })
  isAvailable?: boolean;
} 