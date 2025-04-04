import { ApiProperty } from '@nestjs/swagger';

export class RestaurantDto {
  @ApiProperty({ description: 'Identifiant unique du restaurant' })
  id: number;

  @ApiProperty({ description: 'Nom du restaurant' })
  name: string;

  @ApiProperty({ description: 'Ville du restaurant' })
  city: string;

  @ApiProperty({ description: 'Frais de livraison' })
  deliveryFees: number;

  @ApiProperty({ description: 'Description du restaurant' })
  description: string;

  @ApiProperty({ description: 'Statut du restaurant', enum: ['ACTIVE', 'INACTIVE'] })
  status: string;

  @ApiProperty({ description: 'ID du propriétaire du restaurant' })
  ownerId: number;

  @ApiProperty({ description: 'Date de création' })
  createdAt: Date;

  @ApiProperty({ description: 'Date de mise à jour' })
  updatedAt: Date;
} 