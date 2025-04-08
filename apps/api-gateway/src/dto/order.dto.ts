import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED'
}

export enum PaymentMethod {
  CARD = 'CARD',
  CASH = 'CASH',
  PAYPAL = 'PAYPAL'
}

export class OrderItemDto {
  @ApiProperty({
    description: 'ID de l\'article',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
  })
  @IsString()
  @IsNotEmpty()
  articleId: string;

  @ApiProperty({
    description: 'Quantité commandée',
    example: 2,
    minimum: 1
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID du restaurant',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
  })
  @IsString()
  @IsNotEmpty()
  restaurantId: string;

  @ApiProperty({
    description: 'Articles commandés',
    type: [OrderItemDto],
    example: [
      { articleId: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p', quantity: 2 },
      { articleId: '2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p', quantity: 1 }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({
    description: 'Adresse de livraison',
    example: '123 Main St'
  })
  @IsString()
  @IsNotEmpty()
  deliveryAddress: string;

  @ApiProperty({
    description: 'Méthode de paiement',
    enum: PaymentMethod,
    example: PaymentMethod.CARD
  })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;
}

export class OrderItemResponseDto {
  @ApiProperty({
    description: 'ID de l\'élément de commande',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
  })
  id: string;

  @ApiProperty({
    description: 'ID de la commande',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
  })
  orderId: string;

  @ApiProperty({
    description: 'ID de l\'article',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
  })
  articleId: string;

  @ApiProperty({
    description: 'Quantité commandée',
    example: 2
  })
  quantity: number;

  @ApiProperty({
    description: 'Informations de l\'article',
    example: {
      id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'Burger Classic',
      description: 'Burger avec steak, salade, tomate et sauce spéciale',
      price: 9.99,
      type: 'burger'
    }
  })
  article: any;
}

export class OrderResponseDto {
  @ApiProperty({
    description: 'ID de la commande',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
  })
  id: string;

  @ApiProperty({
    description: 'ID de l\'utilisateur',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
  })
  userId: string;

  @ApiProperty({
    description: 'ID du restaurant',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
  })
  restaurantId: string;

  @ApiProperty({
    description: 'Adresse de livraison',
    example: '123 Main St'
  })
  deliveryAddress: string;

  @ApiProperty({
    description: 'Montant total',
    example: 19.99
  })
  totalAmount: number;

  @ApiProperty({
    description: 'Frais de livraison',
    example: 2.99
  })
  deliveryFees: number;

  @ApiProperty({
    description: 'Frais de service',
    example: 1.99
  })
  serviceFees: number;

  @ApiProperty({
    description: 'Statut de la commande',
    enum: OrderStatus,
    example: OrderStatus.PENDING
  })
  status: OrderStatus;

  @ApiProperty({
    description: 'Méthode de paiement',
    enum: PaymentMethod,
    example: PaymentMethod.CARD
  })
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'Horodatages des changements de statut',
    example: {
      created: '2023-04-01T12:00:00.000Z',
      accepted: '2023-04-01T12:05:00.000Z',
      inProgress: null,
      ready: null,
      delivered: null
    }
  })
  timestamps: any;

  @ApiProperty({
    description: 'Éléments de la commande',
    type: [OrderItemResponseDto]
  })
  orderItems: OrderItemResponseDto[];

  @ApiProperty({
    description: 'Date de création',
    example: '2023-04-01T12:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Informations du restaurant',
    example: {
      id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'Burger Palace',
      city: 'Paris',
      description: 'Les meilleurs burgers de la ville'
    }
  })
  restaurant: any;
}

export class OrderListResponseDto {
  @ApiProperty({
    description: 'Liste des commandes',
    type: [OrderResponseDto]
  })
  orders: OrderResponseDto[];

  @ApiProperty({
    description: 'Nombre total de commandes',
    example: 10
  })
  total: number;
} 