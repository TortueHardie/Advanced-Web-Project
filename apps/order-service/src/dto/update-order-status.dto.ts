import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'The new status for the order',
    enum: OrderStatus,
    example: OrderStatus.IN_PROGRESS,
    enumName: 'OrderStatus'
  })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
} 