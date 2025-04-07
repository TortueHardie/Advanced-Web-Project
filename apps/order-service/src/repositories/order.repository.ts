import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order, OrderItem } from '../interfaces/order.interface';
import { OrderStatus } from '../dto/update-order-status.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new order in the database
   * @param userId The ID of the user placing the order
   * @param createOrderDto The order details with enriched properties
   * @param totalAmount The calculated total amount
   * @returns The created order
   */
  async createOrder(userId: number, createOrderDto: any, totalAmount: number): Promise<Order> {
    // Convert numeric userId to string for Prisma
    const userIdStr = String(userId);
    
    // Calculate service fee as 30% of subtotal
    const subtotal = totalAmount - 2.0; // Subtract delivery fee
    const serviceFees = subtotal * 0.3;
    
    // First, check if the user exists, and create a placeholder one if not
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userIdStr },
    });

    if (!existingUser) {
      // Create a placeholder user to satisfy the foreign key constraint
      await this.prisma.user.create({
        data: {
          id: userIdStr,
          email: `user_${userId}@example.com`,
          username: `user_${userId}`,
          password: 'placeholder',
          role: 'USER'
        }
      });
      console.log(`Created placeholder user with ID ${userIdStr}`);
    }
    
    // Create the order with timestamps
    const createdOrder = await this.prisma.order.create({
      data: {
        userId: userIdStr,
        restaurantId: createOrderDto.restaurantId,
        restaurantName: createOrderDto.restaurantName || `Restaurant ${createOrderDto.restaurantId}`,
        deliveryAddress: createOrderDto.deliveryAddress,
        paymentMethod: createOrderDto.paymentMethod,
        totalAmount: totalAmount,
        deliveryFees: 2.0, // This could be calculated based on distance
        serviceFees: serviceFees,
        items: {
          create: createOrderDto.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice || 0,
            name: item.name || `Product ${item.productId}`,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Format the response to match the Order interface
    return this.mapPrismaOrderToOrderInterface(createdOrder);
  }

  /**
   * Retrieves all orders for a specific user
   * @param userId The ID of the user
   * @returns List of the user's orders
   */
  async getUserOrders(userId: number): Promise<Order[]> {
    // Convert numeric userId to string for Prisma
    const userIdStr = String(userId);

    const orders = await this.prisma.order.findMany({
      where: {
        userId: userIdStr,
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders.map(order => this.mapPrismaOrderToOrderInterface(order));
  }

  /**
   * Retrieves a specific order by ID
   * @param orderId The ID of the order to retrieve
   * @returns The order or null if not found
   */
  async getOrderById(orderId: number): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        orderId: orderId,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return null;
    }

    return this.mapPrismaOrderToOrderInterface(order);
  }

  /**
   * Cancels an order by updating its status to CANCELED
   * @param orderId The ID of the order to cancel
   * @returns True if the operation was successful
   */
  async cancelOrder(orderId: number): Promise<boolean> {
    try {
      await this.prisma.order.update({
        where: {
          orderId: orderId,
        },
        data: {
          status: 'CANCELED',
          canceledAt: new Date(),
        },
      });
      return true;
    } catch (error) {
      console.error(`Error canceling order ${orderId}:`, error);
      return false;
    }
  }

  /**
   * Updates the status of an order
   * @param orderId The ID of the order to update
   * @param status The new status to set
   * @returns True if the operation was successful
   */
  async updateOrderStatus(orderId: number, status: OrderStatus): Promise<boolean> {
    try {
      const timestampField = this.getTimestampFieldForStatus(status);
      
      // Convert status to uppercase for database (Prisma enum)
      let dbStatus = status;
      
      // Map from lowercase API enum values to uppercase DB enum values
      const statusMapping = {
        'pending': 'PENDING',
        'accepted': 'ACCEPTED',
        'in_progress': 'IN_PROGRESS',
        'ready': 'READY',
        'delivered': 'DELIVERED',
        'canceled': 'CANCELED'
      };
      
      if (statusMapping[status]) {
        dbStatus = statusMapping[status] as OrderStatus;
      }
      
      console.log(`Converting status from ${status} to ${dbStatus} for database`);
      
      const updateData: any = {
        status: dbStatus,
      };
      
      // Add timestamp if applicable
      if (timestampField) {
        updateData[timestampField] = new Date();
      }
      
      await this.prisma.order.update({
        where: {
          orderId: orderId,
        },
        data: updateData,
      });
      
      return true;
    } catch (error) {
      console.error(`Error updating order ${orderId} status:`, error);
      return false;
    }
  }

  /**
   * Retrieves all orders for admin/restaurant management
   * @returns List of all orders
   */
  async getAdminOrders(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        items: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders.map(order => this.mapPrismaOrderToOrderInterface(order));
  }

  /**
   * Helper method to determine which timestamp field to update based on status
   * @param status The order status
   * @returns The corresponding timestamp field name or null
   */
  private getTimestampFieldForStatus(status: OrderStatus): string | null {
    const statusToTimestampMap = {
      [OrderStatus.ACCEPTED]: 'acceptedAt',
      [OrderStatus.IN_PROGRESS]: 'inProgressAt',
      [OrderStatus.READY]: 'readyAt',
      [OrderStatus.DELIVERED]: 'deliveredAt',
      [OrderStatus.CANCELED]: 'canceledAt',
    };
    
    return statusToTimestampMap[status] || null;
  }

  /**
   * Maps Prisma Order entity to Order interface
   * @param prismaOrder The Prisma Order entity with relations
   * @returns Order object matching the interface
   */
  private mapPrismaOrderToOrderInterface(prismaOrder: any): Order {
    return {
      orderId: prismaOrder.orderId,
      userId: Number(prismaOrder.userId),
      restaurantId: prismaOrder.restaurantId,
      restaurantName: prismaOrder.restaurantName || `Restaurant ${prismaOrder.restaurantId}`,
      items: prismaOrder.items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        name: item.name || `Product ${item.productId}`,
        unitPrice: item.unitPrice || 0,
      })),
      deliveryAddress: prismaOrder.deliveryAddress,
      paymentMethod: prismaOrder.paymentMethod,
      status: prismaOrder.status as OrderStatus,
      totalAmount: prismaOrder.totalAmount,
      deliveryFees: prismaOrder.deliveryFees,
      serviceFees: prismaOrder.serviceFees,
      timestamps: {
        createdAt: prismaOrder.createdAt,
        acceptedAt: prismaOrder.acceptedAt,
        inProgressAt: prismaOrder.inProgressAt,
        readyAt: prismaOrder.readyAt,
        deliveredAt: prismaOrder.deliveredAt,
        canceledAt: prismaOrder.canceledAt,
      },
    };
  }
} 