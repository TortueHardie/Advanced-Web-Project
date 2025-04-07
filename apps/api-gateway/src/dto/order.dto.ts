import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}

// Request DTOs
export class OrderItemDto {
  @ApiProperty({
    description: 'The ID of the product to order',
    example: 1,
    type: Number
  })
  productId: number;

  @ApiProperty({
    description: 'The quantity of the product',
    example: 2,
    type: Number,
    minimum: 1
  })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the restaurant',
    example: 1,
    type: Number
  })
  restaurantId: number;

  @ApiProperty({
    description: 'The list of items to order',
    type: [OrderItemDto],
    example: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 }
    ]
  })
  items: OrderItemDto[];

  @ApiProperty({
    description: 'The delivery address',
    example: '24 Le Paquebot',
    type: String
  })
  deliveryAddress: string;

  @ApiProperty({
    description: 'The payment method',
    example: 'card',
    type: String,
    enum: ['card', 'cash', 'paypal']
  })
  paymentMethod: string;
}

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'The new status for the order',
    enum: OrderStatus,
    example: OrderStatus.IN_PROGRESS,
    enumName: 'OrderStatus'
  })
  status: OrderStatus;
}

// Response DTOs
export class OrderItemResponseDto {
  @ApiProperty({
    description: 'Name of the ordered product',
    example: 'Kebab'
  })
  name: string;

  @ApiProperty({
    description: 'Quantity ordered',
    example: 2
  })
  quantity: number;

  @ApiProperty({
    description: 'Unit price of the product',
    example: 7.50
  })
  unitPrice: number;
}

export class OrderTimestampsDto {
  @ApiProperty({
    description: 'Date and time when the order was created',
    example: '2025-03-21T08:23:24Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the order was accepted by the restaurant',
    example: '2025-03-21T08:25:00Z',
    nullable: true
  })
  acceptedAt: Date | null;

  @ApiProperty({
    description: 'Date and time when the order was delivered',
    example: null,
    nullable: true
  })
  deliveredAt: Date | null;
}

export class OrderSummaryDto {
  @ApiProperty({
    description: 'Unique identifier for the order',
    example: 1245
  })
  orderId: number;

  @ApiProperty({
    description: 'Name of the restaurant',
    example: 'GoMiam'
  })
  restaurantName: string;

  @ApiProperty({
    description: 'Date and time when the order was created',
    example: '2025-03-21T08:23:24Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Current status of the order',
    example: 'in_progress',
    enum: OrderStatus
  })
  status: string;

  @ApiProperty({
    description: 'Total amount of the order',
    example: 23.00
  })
  totalAmount: number;
}

export class OrderDetailDto {
  @ApiProperty({
    description: 'Unique identifier for the order',
    example: 1245
  })
  orderId: number;

  @ApiProperty({
    description: 'Name of the restaurant',
    example: 'GoMiam'
  })
  restaurantName: string;

  @ApiProperty({
    description: 'List of items in the order',
    type: [OrderItemResponseDto]
  })
  items: OrderItemResponseDto[];

  @ApiProperty({
    description: 'Delivery fees',
    example: 2.00
  })
  deliveryFees: number;

  @ApiProperty({
    description: 'Service fees (30%)',
    example: 6.00
  })
  serviceFees: number;

  @ApiProperty({
    description: 'Total amount',
    example: 23.00
  })
  totalAmount: number;

  @ApiProperty({
    description: 'Current status of the order',
    example: 'accepted',
    enum: OrderStatus
  })
  status: string;

  @ApiProperty({
    description: 'Order timestamps for different status transitions',
    type: OrderTimestampsDto
  })
  timestamps: OrderTimestampsDto;
}

export class OrderCreatedDto {
  @ApiProperty({
    description: 'Unique identifier for the created order',
    example: 1245
  })
  orderId: number;

  @ApiProperty({
    description: 'Initial status of the order',
    example: 'pending',
    enum: [OrderStatus.PENDING]
  })
  status: string;

  @ApiProperty({
    description: 'Total amount for the order',
    example: 23.00
  })
  totalAmount: number;
}

export class MessageResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Order status updated'
  })
  message: string;
}

export class AdminOrderSummaryDto extends OrderSummaryDto {
  @ApiProperty({
    description: 'User ID who placed the order',
    example: 1
  })
  userId: number;
} 