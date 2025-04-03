import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../interfaces/order.interface';
import { OrderStatus } from '../dto/update-order-status.dto';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  /**
   * Creates a new order for a user
   * @param userId The ID of the user placing the order
   * @param createOrderDto The order details
   * @returns The created order summary
   */
  async createOrder(userId: number, createOrderDto: CreateOrderDto): Promise<{ orderId: number; status: string; totalAmount: number }> {
    // In a real app, we would need to:
    // 1. Call restaurant service to validate restaurant exists
    // 2. Call product service to get product prices
    // 3. Calculate total amount
    
    // For this mock, we'll calculate a simple total
    // In real app, we'd get actual prices from product service
    const mockUnitPrice = 7.50; // Mock unit price for all products
    
    // Calculate total before fees
    const subtotal = createOrderDto.items.reduce((total, item) => {
      return total + (mockUnitPrice * item.quantity);
    }, 0);
    
    // Add delivery fee
    const deliveryFee = 2.0;
    
    // Calculate service fee (30%)
    const serviceFee = subtotal * 0.3;
    
    // Total amount
    const totalAmount = subtotal + deliveryFee + serviceFee;
    
    // Create the order
    const order = await this.orderRepository.createOrder(
      userId,
      createOrderDto,
      totalAmount,
    );
    
    return {
      orderId: order.orderId,
      status: order.status,
      totalAmount: order.totalAmount,
    };
  }

  /**
   * Retrieves all orders for a specific user
   * @param userId The ID of the user
   * @returns List of the user's orders with summary information
   */
  async getUserOrders(userId: number): Promise<any[]> {
    const orders = await this.orderRepository.getUserOrders(userId);
    
    // Format response to match API spec
    return orders.map((order) => ({
      orderId: order.orderId,
      restaurantName: order.restaurantName,
      createdAt: order.timestamps.createdAt,
      status: order.status,
      totalAmount: order.totalAmount,
    }));
  }

  /**
   * Retrieves detailed information about a specific order
   * @param userId The ID of the user requesting the order (for authorization)
   * @param orderId The ID of the order to retrieve
   * @returns Detailed order information
   */
  async getOrderById(userId: number, orderId: number): Promise<Order> {
    const order = await this.orderRepository.getOrderById(orderId);
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    
    // Check if order belongs to user (except for admin)
    if (order.userId !== userId) {
      // In real app, check if user has admin role
      // For now, we'll just throw forbidden
      throw new ForbiddenException('You do not have permission to access this order');
    }
    
    return order;
  }

  /**
   * Cancels an order if it's in a cancelable state
   * @param userId The ID of the user canceling the order
   * @param orderId The ID of the order to cancel
   * @returns Confirmation message
   */
  async cancelOrder(userId: number, orderId: number): Promise<{ message: string }> {
    const order = await this.orderRepository.getOrderById(orderId);
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    
    // Check if order belongs to user
    if (order.userId !== userId) {
      throw new ForbiddenException('You do not have permission to cancel this order');
    }
    
    // Check if order can be canceled
    if (![OrderStatus.PENDING, OrderStatus.ACCEPTED].includes(order.status)) {
      throw new BadRequestException('Order cannot be canceled in its current state');
    }
    
    // Update order status
    const success = await this.orderRepository.cancelOrder(orderId);
    
    if (!success) {
      throw new BadRequestException('Failed to cancel order');
    }
    
    return { message: 'Order canceled successfully' };
  }

  /**
   * Updates the status of an order
   * @param orderId The ID of the order to update
   * @param status The new status for the order
   * @returns Confirmation message
   */
  async updateOrderStatus(orderId: number, status: OrderStatus): Promise<{ message: string }> {
    const order = await this.orderRepository.getOrderById(orderId);
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    
    // In real app, check if user has permission to update status
    
    // Validate status transition
    this.validateStatusTransition(order.status, status);
    
    // Update order status
    const success = await this.orderRepository.updateOrderStatus(orderId, status);
    
    if (!success) {
      throw new BadRequestException('Failed to update order status');
    }
    
    return { message: 'Order status updated' };
  }

  /**
   * Retrieves all orders for admin/restaurant management
   * @returns List of all orders with summary information
   */
  async getAdminOrders(): Promise<any[]> {
    const orders = await this.orderRepository.getAdminOrders();
    
    // Format response to match API spec
    return orders.map((order) => ({
      orderId: order.orderId,
      userId: order.userId,
      restaurantName: order.restaurantName,
      createdAt: order.timestamps.createdAt,
      status: order.status,
      totalAmount: order.totalAmount,
    }));
  }

  /**
   * Validates that a status transition is allowed
   * @param currentStatus The current order status
   * @param newStatus The requested new status
   * @throws BadRequestException if the transition is invalid
   */
  private validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): void {
    // Define valid status transitions
    const validTransitions = {
      [OrderStatus.PENDING]: [OrderStatus.ACCEPTED, OrderStatus.CANCELED],
      [OrderStatus.ACCEPTED]: [OrderStatus.IN_PROGRESS, OrderStatus.CANCELED],
      [OrderStatus.IN_PROGRESS]: [OrderStatus.READY],
      [OrderStatus.READY]: [OrderStatus.DELIVERED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELED]: [],
    };
    
    // Check if the new status is in the list of valid transitions
    if (!validTransitions[currentStatus].includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }
} 