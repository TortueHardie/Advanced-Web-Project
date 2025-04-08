import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { OrderStatus } from '../constants/order-status.enum';

export class DeliveryResponseDto {
  @ApiProperty({
    description: 'Identifiant unique de la commande',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6'
  })
  @IsUUID()
  orderId: string;

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
    enum: OrderStatus,
    example: OrderStatus.READY
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({
    description: 'Identifiant du livreur assigné à cette livraison',
    required: false,
    example: 'b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6'
  })
  @IsUUID()
  @IsOptional()
  deliveryPersonId?: string;
}

export class UpdateDeliveryStatusDto {
  @ApiProperty({
    description: 'Nouveau statut de la livraison',
    enum: OrderStatus,
    example: OrderStatus.IN_PROGRESS
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
} 