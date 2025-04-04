import { ApiProperty } from '@nestjs/swagger';

export enum RestaurantStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export class RestaurantDto {
  @ApiProperty({ description: 'ID du restaurant' })
  id: number;

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
  ownerId?: number;
}

export class CreateRestaurantDto {
  @ApiProperty({ description: 'Nom du restaurant' })
  name: string;

  @ApiProperty({ description: 'Ville du restaurant' })
  city: string;

  @ApiProperty({ description: 'Frais de livraison' })
  deliveryFees: number;

  @ApiProperty({ description: 'Description du restaurant' })
  description: string;

  @ApiProperty({ description: 'ID du propriétaire', required: false })
  ownerId?: number;
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