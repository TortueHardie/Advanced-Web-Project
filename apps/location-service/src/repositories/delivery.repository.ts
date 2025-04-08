import { Injectable } from '@nestjs/common';
import { PrismaService } from '@advanced-web/prisma';
import { DeliveryResponseDto } from '../dto/delivery.dto';
import { OrderStatus } from '../constants/order-status.enum';

@Injectable()
export class DeliveryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByStatus(status: OrderStatus): Promise<DeliveryResponseDto[]> {
    const orders = await this.prisma.order.findMany({
      where: { status },
      include: {
        restaurant: true,
        user: true
      }
    });

    // Transformer les commandes en format DeliveryResponseDto
    return orders.map(order => this.mapOrderToDeliveryResponse(order));
  }

  async findById(orderId: string): Promise<DeliveryResponseDto | null> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        restaurant: true,
        user: true
      }
    });

    if (!order) return null;
    
    return this.mapOrderToDeliveryResponse(order);
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<DeliveryResponseDto> {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { 
        status,
        timestamps: {
          ...((order) => order?.timestamps || {})(await this.prisma.order.findUnique({ where: { id: orderId } })),
          [status.toLowerCase()]: new Date()
        }
      },
      include: {
        restaurant: true,
        user: true
      }
    });

    return this.mapOrderToDeliveryResponse(order);
  }

  async updateStatusAndAssignee(orderId: string, status: OrderStatus, deliveryPersonId: string): Promise<DeliveryResponseDto> {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { 
        status,
        deliveryPersonId,
        timestamps: {
          ...((order) => order?.timestamps || {})(await this.prisma.order.findUnique({ where: { id: orderId } })),
          [status.toLowerCase()]: new Date()
        }
      },
      include: {
        restaurant: true,
        user: true
      }
    });

    return this.mapOrderToDeliveryResponse(order);
  }

  async findMyDeliveries(deliveryPersonId: string): Promise<DeliveryResponseDto[]> {
    const orders = await this.prisma.order.findMany({
      where: { deliveryPersonId },
      include: {
        restaurant: true,
        user: true
      }
    });

    return orders.map(order => this.mapOrderToDeliveryResponse(order));
  }

  // Fonction utilitaire pour transformer un Order en DeliveryResponseDto
  private mapOrderToDeliveryResponse(order: any): DeliveryResponseDto {
    return {
      orderId: order.id,
      restaurantName: order.restaurant.name,
      pickupAddress: order.restaurant.city,
      deliveryAddress: order.deliveryAddress,
      totalAmount: order.totalAmount,
      status: order.status,
      deliveryPersonId: order.deliveryPersonId
    };
  }
} 