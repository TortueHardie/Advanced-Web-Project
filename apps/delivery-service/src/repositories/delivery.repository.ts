import { Injectable } from '@nestjs/common';
import { PrismaService } from '@advanced-web/prisma';
import { DeliveryResponseDto } from '../dto/delivery.dto';
import { OrderStatus } from '../constants/order-status.enum';

@Injectable()
export class DeliveryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByStatus(status: OrderStatus): Promise<DeliveryResponseDto[]> {
    try {
      const orders = await this.prisma.$queryRaw`
        SELECT o.*, r.name as "restaurantName", r.city as "pickupAddress"
        FROM "order" o
        JOIN "restaurant" r ON o."restaurantId" = r.id
        WHERE o.status = ${status}::text::\"OrderStatus\"
      `;

      return Array.isArray(orders) ? orders.map(order => this.mapOrderToDeliveryResponse(order)) : [];
    } catch (error) {
      console.error('Erreur lors de la recherche des commandes par statut:', error);
      return [];
    }
  }

  async findById(orderId: string): Promise<DeliveryResponseDto | null> {
    try {
      const orders = await this.prisma.$queryRaw`
        SELECT o.*, r.name as "restaurantName", r.city as "pickupAddress"
        FROM "order" o
        JOIN "restaurant" r ON o."restaurantId" = r.id
        WHERE o.id = ${orderId}
      `;
      
      const order = Array.isArray(orders) && orders.length > 0 ? orders[0] : null;
      if (!order) return null;
      
      return this.mapOrderToDeliveryResponse(order);
    } catch (error) {
      console.error('Erreur lors de la recherche d\'une commande par ID:', error);
      return null;
    }
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<DeliveryResponseDto> {
    try {
      // D'abord récupérer la commande existante
      const existingOrders = await this.prisma.$queryRaw`
        SELECT * FROM "order" WHERE id = ${orderId}
      `;
      
      const existingOrder = Array.isArray(existingOrders) && existingOrders.length > 0 ? existingOrders[0] : null;
      const existingTimestamps = existingOrder?.timestamps || {};
      
      // Créer les nouveaux timestamps
      const newTimestamps = {
        ...existingTimestamps,
        [status.toLowerCase()]: new Date().toISOString()
      };
      
      // Mise à jour de la commande
      await this.prisma.$executeRaw`
        UPDATE "order"
        SET status = ${status}::text::\"OrderStatus\", timestamps = ${JSON.stringify(newTimestamps)}::jsonb
        WHERE id = ${orderId}
      `;
      
      return this.findById(orderId);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la commande:', error);
      throw error;
    }
  }

  async updateStatusAndAssignee(orderId: string, status: OrderStatus, deliveryPersonId: string): Promise<DeliveryResponseDto> {
    try {
      // D'abord récupérer la commande existante
      const existingOrders = await this.prisma.$queryRaw`
        SELECT * FROM "order" WHERE id = ${orderId}
      `;
      
      const existingOrder = Array.isArray(existingOrders) && existingOrders.length > 0 ? existingOrders[0] : null;
      const existingTimestamps = existingOrder?.timestamps || {};
      
      // Créer les nouveaux timestamps
      const newTimestamps = {
        ...existingTimestamps,
        [status.toLowerCase()]: new Date().toISOString()
      };
      
      // Mise à jour de la commande
      await this.prisma.$executeRaw`
        UPDATE "order"
        SET status = ${status}::text::\"OrderStatus\", 
            "deliveryPersonId" = ${deliveryPersonId}, 
            timestamps = ${JSON.stringify(newTimestamps)}::jsonb
        WHERE id = ${orderId}
      `;
      
      return this.findById(orderId);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut et du livreur de la commande:', error);
      throw error;
    }
  }

  async findMyDeliveries(deliveryPersonId: string): Promise<DeliveryResponseDto[]> {
    try {
      const orders = await this.prisma.$queryRaw`
        SELECT o.*, r.name as "restaurantName", r.city as "pickupAddress"
        FROM "order" o
        JOIN "restaurant" r ON o."restaurantId" = r.id
        WHERE o."deliveryPersonId" = ${deliveryPersonId}
      `;

      return Array.isArray(orders) ? orders.map(order => this.mapOrderToDeliveryResponse(order)) : [];
    } catch (error) {
      console.error('Erreur lors de la recherche des livraisons d\'un livreur:', error);
      return [];
    }
  }

  // Fonction utilitaire pour transformer un Order en DeliveryResponseDto
  private mapOrderToDeliveryResponse(order: any): DeliveryResponseDto {
    return {
      orderId: order.id,
      restaurantName: order.restaurantName,
      pickupAddress: order.pickupAddress,
      deliveryAddress: order.deliveryAddress,
      totalAmount: order.totalAmount,
      status: order.status,
      deliveryPersonId: order.deliveryPersonId
    };
  }
} 