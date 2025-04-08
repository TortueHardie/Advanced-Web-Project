import { Injectable } from '@nestjs/common';
import { PrismaService } from '@advanced-web/prisma';
import { DeliveryResponseDto } from '../dto/delivery.dto';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class DeliveryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByStatus(status: DeliveryStatus): Promise<DeliveryResponseDto[]> {
    return this.prisma.delivery.findMany({
      where: { status }
    });
  }

  async findById(orderId: number): Promise<DeliveryResponseDto | null> {
    return this.prisma.delivery.findUnique({
      where: { orderId }
    });
  }

  async updateStatus(orderId: number, status: DeliveryStatus): Promise<DeliveryResponseDto> {
    return this.prisma.delivery.update({
      where: { orderId },
      data: { 
        status,
        updatedAt: new Date()
      }
    });
  }

  async updateStatusAndAssignee(orderId: number, status: DeliveryStatus, deliveryPersonId: number): Promise<DeliveryResponseDto> {
    return this.prisma.delivery.update({
      where: { orderId },
      data: { 
        status,
        deliveryPersonId,
        updatedAt: new Date()
      }
    });
  }

  async findMyDeliveries(deliveryPersonId: number): Promise<DeliveryResponseDto[]> {
    return this.prisma.delivery.findMany({
      where: { deliveryPersonId }
    });
  }
} 