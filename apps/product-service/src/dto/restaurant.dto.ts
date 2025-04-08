import { ApiProperty } from '@nestjs/swagger';
import { MenuDto } from './menu.dto';
import { ArticleDto } from './article.dto';
import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, Max, Length } from 'class-validator';

export enum RestaurantStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export class RestaurantDto {
  @ApiProperty({ description: 'ID du restaurant' })
  id: string;

  @ApiProperty({ description: 'Nom du restaurant' })
  name: string;

  @ApiProperty({ description: 'Ville du restaurant' })
  city: string;

  @ApiProperty({ description: 'Frais de livraison' })
  deliveryFees: number;

  @ApiProperty({ description: 'Description du restaurant' })
  description: string;

  @ApiProperty({ description: 'Statut du restaurant', enum: RestaurantStatus })
  status: RestaurantStatus;

  @ApiProperty({ description: 'ID du propriétaire', required: false })
  ownerId?: string;

  @ApiProperty({ description: 'Menus du restaurant', type: [MenuDto], required: false })
  menus?: MenuDto[];

  @ApiProperty({ description: 'Articles du restaurant', type: [ArticleDto], required: false })
  articles?: ArticleDto[];
}

export class CreateRestaurantDto {
  @ApiProperty({ description: 'Nom du restaurant' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Ville du restaurant' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'Frais de livraison' })
  @IsNumber()
  @IsNotEmpty()
  deliveryFees: number;

  @ApiProperty({ description: 'Description du restaurant' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'ID du propriétaire', required: false })
  @IsString()
  @IsOptional()
  ownerId?: string;
}

export class UpdateRestaurantDto {
  @ApiProperty({ description: 'Nom du restaurant', required: false })
  name?: string;

  @ApiProperty({ description: 'Ville du restaurant', required: false })
  city?: string;

  @ApiProperty({ description: 'Frais de livraison', required: false })
  deliveryFees?: number;

  @ApiProperty({ description: 'Description du restaurant', required: false })
  description?: string;

  @ApiProperty({ description: 'Statut du restaurant', enum: RestaurantStatus, required: false })
  status?: RestaurantStatus;
} 