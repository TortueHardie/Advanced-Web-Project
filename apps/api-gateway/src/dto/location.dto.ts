import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum DeliveryStatus {
  READY = 'READY',
  ASSIGNED = 'ASSIGNED',
  PICKUP_IN_PROGRESS = 'PICKUP_IN_PROGRESS',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export class DeliveryResponseDto {
  @ApiProperty({
    description: 'Identifiant unique de la commande',
    example: 1245
  })
  @IsNumber()
  orderId: number;

  @ApiProperty({
    description: 'Nom du restaurant',
    example: 'Le Bistrot Parisien'
  })
  @IsString()
  restaurantName: string;

  @ApiProperty({
    description: 'Adresse de prise en charge de la commande',
    example: '15 rue de la Paix, 75001 Paris'
  })
  @IsString()
  pickupAddress: string;

  @ApiProperty({
    description: 'Adresse de livraison',
    example: '8 avenue des Champs-Élysées, 75008 Paris'
  })
  @IsString()
  deliveryAddress: string;

  @ApiProperty({
    description: 'Montant total de la commande en euros',
    example: 42.50
  })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    description: 'Statut actuel de la livraison',
    enum: DeliveryStatus,
    example: DeliveryStatus.READY
  })
  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;

  @ApiProperty({
    description: 'Identifiant du livreur assigné à cette livraison',
    required: false,
    example: 789
  })
  @IsNumber()
  deliveryPersonId?: number;
}

export class UpdateDeliveryStatusDto {
  @ApiProperty({
    description: 'Nouveau statut de la livraison',
    enum: DeliveryStatus,
    example: DeliveryStatus.PICKUP_IN_PROGRESS
  })
  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;
} 