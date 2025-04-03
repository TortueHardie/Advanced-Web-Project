import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order, OrderItem } from '../interfaces/order.interface';
import { OrderStatus } from '../dto/update-order-status.dto';

@Injectable()
export class OrderRepository {
  constructor() {}

  /**
   * Creates a new order in the database
   * @param userId The ID of the user placing the order
   * @param createOrderDto The order details
   * @param totalAmount The calculated total amount
   * @returns The created order
   */
  async createOrder(userId: number, createOrderDto: CreateOrderDto, totalAmount: number): Promise<Order> {
    // This is a mocked implementation
    const orderId = Math.floor(Math.random() * 10000);
    
    const now = new Date();
    
    // Mock order creation
    return {
      orderId,
      userId,
      restaurantId: createOrderDto.restaurantId,
      restaurantName: 'Restaurant Name', // In real app, fetch from restaurant service
      items: createOrderDto.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        name: `Product ${item.productId}`, // In real app, fetch from product service
        unitPrice: 0, // In real app, fetch from product service
      })),
      deliveryAddress: createOrderDto.deliveryAddress,
      paymentMethod: createOrderDto.paymentMethod,
      status: OrderStatus.PENDING,
      totalAmount,
      deliveryFees: 2.0, // Mock value, would be calculated
      serviceFees: totalAmount * 0.3, // 30% service fee
      timestamps: {
        createdAt: now,
      },
    };
  }

  /**
   * Retrieves all orders for a specific user
   * @param userId The ID of the user
   * @returns List of the user's orders
   */
  async getUserOrders(userId: number): Promise<Order[]> {
    // Mock retrieving user orders
    return [
      {
        orderId: 1245,
        userId,
        restaurantId: 1,
        restaurantName: 'GoMiam',
        items: [],
        deliveryAddress: '24 Le Paquebot',
        paymentMethod: 'card',
        status: OrderStatus.IN_PROGRESS,
        totalAmount: 23.0,
        deliveryFees: 2.0,
        serviceFees: 6.0,
        timestamps: {
          createdAt: new Date('2025-03-21T08:23:24Z'),
        },
      },
    ];
  }

  /**
   * Retrieves a specific order by ID
   * @param orderId The ID of the order to retrieve
   * @returns The order or null if not found
   */
  async getOrderById(orderId: number): Promise<Order | null> {
    // Mock retrieving a specific order
    if (orderId === 1245) {
      return {
        orderId: 1245,
        userId: 1,
        restaurantId: 1,
        restaurantName: 'GoMiam',
        items: [
          { productId: 1, quantity: 2, name: 'Kebab', unitPrice: 7.5 },
          { productId: 2, quantity: 1, name: 'Cola', unitPrice: 2.0 },
        ],
        deliveryAddress: '24 Le Paquebot',
        paymentMethod: 'card',
        status: OrderStatus.ACCEPTED,
        totalAmount: 23.0,
        deliveryFees: 2.0,
        serviceFees: 6.0,
        timestamps: {
          createdAt: new Date('2025-03-21T08:23:24Z'),
          acceptedAt: new Date('2025-03-21T08:25:00Z'),
        },
      };
    }
    return null;
  }

  /**
   * Cancels an order by updating its status to CANCELED
   * @param orderId The ID of the order to cancel
   * @returns True if the operation was successful
   */
  async cancelOrder(orderId: number): Promise<boolean> {
    // Mock implementation
    return true;
  }

  /**
   * Updates the status of an order
   * @param orderId The ID of the order to update
   * @param status The new status to set
   * @returns True if the operation was successful
   */
  async updateOrderStatus(orderId: number, status: OrderStatus): Promise<boolean> {
    // Mock implementation
    return true;
  }

  /**
   * Retrieves all orders for admin/restaurant management
   * @returns List of all orders
   */
  async getAdminOrders(): Promise<Order[]> {
    // Mock retrieving all orders for admin/restaurant
    return [
      {
        orderId: 1245,
        userId: 1,
        restaurantId: 1,
        restaurantName: 'GoMiam',
        items: [],
        deliveryAddress: '24 Le Paquebot',
        paymentMethod: 'card',
        status: OrderStatus.IN_PROGRESS,
        totalAmount: 23.0,
        deliveryFees: 2.0,
        serviceFees: 6.0,
        timestamps: {
          createdAt: new Date('2025-03-21T08:23:24Z'),
        },
      },
    ];
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
} 