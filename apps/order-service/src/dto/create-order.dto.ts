import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({
    description: 'The ID of the product to order',
    example: 1,
    type: Number
  })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    description: 'The quantity of the product',
    example: 2,
    type: Number,
    minimum: 1
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the restaurant',
    example: 1,
    type: Number
  })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({
    description: 'The list of items to order',
    type: [OrderItemDto],
    example: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({
    description: 'The delivery address',
    example: '24 Le Paquebot',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  deliveryAddress: string;

  @ApiProperty({
    description: 'The payment method',
    example: 'card',
    type: String,
    enum: ['card', 'cash', 'paypal']
  })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;
} 