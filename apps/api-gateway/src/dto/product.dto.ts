import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';

// Restaurant DTOs
export class CreateRestaurantDto {
  @ApiProperty({
    description: 'Nom du restaurant',
    example: 'Le Bistrot Parisien'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Adresse du restaurant',
    example: '15 rue de la Paix, 75001 Paris'
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Description du restaurant',
    example: 'Un restaurant traditionnel français au cœur de Paris'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'URL de l\'image du restaurant',
    example: 'https://example.com/images/restaurant.jpg',
    required: false
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'Horaires d\'ouverture du restaurant',
    example: 'Lun-Ven: 11h-22h, Sam-Dim: 10h-23h'
  })
  @IsString()
  openingHours: string;
}

export class UpdateRestaurantDto {
  @ApiProperty({
    description: 'Nom du restaurant',
    example: 'Le Bistrot Parisien',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Adresse du restaurant',
    example: '15 rue de la Paix, 75001 Paris',
    required: false
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Description du restaurant',
    example: 'Un restaurant traditionnel français au cœur de Paris',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'URL de l\'image du restaurant',
    example: 'https://example.com/images/restaurant.jpg',
    required: false
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'Horaires d\'ouverture du restaurant',
    example: 'Lun-Ven: 11h-22h, Sam-Dim: 10h-23h',
    required: false
  })
  @IsString()
  @IsOptional()
  openingHours?: string;
}

export class RestaurantDto {
  @ApiProperty({
    description: 'Identifiant unique du restaurant',
    example: 1
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nom du restaurant',
    example: 'Le Bistrot Parisien'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Adresse du restaurant',
    example: '15 rue de la Paix, 75001 Paris'
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Description du restaurant',
    example: 'Un restaurant traditionnel français au cœur de Paris'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'URL de l\'image du restaurant',
    example: 'https://example.com/images/restaurant.jpg'
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'Horaires d\'ouverture du restaurant',
    example: 'Lun-Ven: 11h-22h, Sam-Dim: 10h-23h'
  })
  @IsString()
  openingHours: string;

  @ApiProperty({
    description: 'Date de création du restaurant',
    example: '2023-01-15T10:30:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour du restaurant',
    example: '2023-02-20T14:15:00Z'
  })
  updatedAt: Date;
}

// Menu DTOs
export class CreateMenuDto {
  @ApiProperty({
    description: 'Nom du menu',
    example: 'Menu Déjeuner'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description du menu',
    example: 'Un menu complet pour le déjeuner'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Prix du menu',
    example: 24.99
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'ID du restaurant auquel ce menu appartient',
    example: 1
  })
  @IsNumber()
  restaurantId: number;
}

export class UpdateMenuDto {
  @ApiProperty({
    description: 'Nom du menu',
    example: 'Menu Déjeuner',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description du menu',
    example: 'Un menu complet pour le déjeuner',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Prix du menu',
    example: 24.99,
    required: false
  })
  @IsNumber()
  @IsOptional()
  price?: number;
}

export class MenuDto {
  @ApiProperty({
    description: 'Identifiant unique du menu',
    example: 1
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nom du menu',
    example: 'Menu Déjeuner'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description du menu',
    example: 'Un menu complet pour le déjeuner'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Prix du menu',
    example: 24.99
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'ID du restaurant auquel ce menu appartient',
    example: 1
  })
  @IsNumber()
  restaurantId: number;

  @ApiProperty({
    description: 'Date de création du menu',
    example: '2023-01-15T10:30:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour du menu',
    example: '2023-02-20T14:15:00Z'
  })
  updatedAt: Date;
}

// Article DTOs
export class CreateArticleDto {
  @ApiProperty({
    description: 'Nom de l\'article',
    example: 'Steak Frites'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description de l\'article',
    example: 'Steak de bœuf avec frites maison et sauce au poivre'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Prix de l\'article',
    example: 18.50
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'URL de l\'image de l\'article',
    example: 'https://example.com/images/steak.jpg',
    required: false
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'Catégorie de l\'article',
    example: 'Plat principal'
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Indique si l\'article est disponible',
    example: true,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty({
    description: 'IDs des menus auxquels cet article est associé',
    example: [1, 3],
    required: false,
    type: [Number]
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  menuIds?: number[];
}

export class UpdateArticleDto {
  @ApiProperty({
    description: 'Nom de l\'article',
    example: 'Steak Frites',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description de l\'article',
    example: 'Steak de bœuf avec frites maison et sauce au poivre',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Prix de l\'article',
    example: 18.50,
    required: false
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'URL de l\'image de l\'article',
    example: 'https://example.com/images/steak.jpg',
    required: false
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'Catégorie de l\'article',
    example: 'Plat principal',
    required: false
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'Indique si l\'article est disponible',
    example: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty({
    description: 'IDs des menus auxquels cet article est associé',
    example: [1, 3],
    required: false,
    type: [Number]
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  menuIds?: number[];
}

export class ArticleDto {
  @ApiProperty({
    description: 'Identifiant unique de l\'article',
    example: 1
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nom de l\'article',
    example: 'Steak Frites'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description de l\'article',
    example: 'Steak de bœuf avec frites maison et sauce au poivre'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Prix de l\'article',
    example: 18.50
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'URL de l\'image de l\'article',
    example: 'https://example.com/images/steak.jpg'
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'Catégorie de l\'article',
    example: 'Plat principal'
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Indique si l\'article est disponible',
    example: true
  })
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    description: 'Date de création de l\'article',
    example: '2023-01-15T10:30:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour de l\'article',
    example: '2023-02-20T14:15:00Z'
  })
  updatedAt: Date;
} 