import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../interfaces/order.interface';
import { OrderStatus } from '../dto/update-order-status.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// Product interface to handle service communication
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  restaurantId: number;
}

// Restaurant interface to handle service communication
interface Restaurant {
  id: number;
  name: string;
}

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    @Inject('RESTAURANT_SERVICE') private restaurantClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private productClient: ClientProxy,
  ) {}

  /**
   * Creates a new order for a user
   * @param userId The ID of the user placing the order
   * @param createOrderDto The order details
   * @returns The created order summary
   */
  async createOrder(userId: number, createOrderDto: CreateOrderDto): Promise<{ orderId: number; status: string; totalAmount: number }> {
    try {
      let restaurant;
      let restaurantName = createOrderDto.restaurantName || `Restaurant ${createOrderDto.restaurantId}`;
      
      // 1. Validate restaurant exists - but provide fallback for development
      try {
        restaurant = await firstValueFrom<Restaurant>(
          this.restaurantClient.send({ cmd: 'get_restaurant' }, { id: createOrderDto.restaurantId })
        );
        
        if (restaurant) {
          restaurantName = restaurant.name;
        }
      } catch (error) {
        console.log('Restaurant service unavailable, using fallback data', error.message);
        // We'll continue with the fallback name
      }

      // 2. Prepare enriched items with product details
      let enrichedItems = createOrderDto.items;
      let subtotal = 0;
      
      // Try to get product details from service, fallback to provided values if service is down
      try {
        const productIds = createOrderDto.items.map(item => item.productId);
        
        const products = await firstValueFrom<Product[]>(
          this.productClient.send({ cmd: 'get_products_by_ids' }, { ids: productIds })
        );

        if (products && products.length === productIds.length) {
          // Create a map of product details for easier access
          const productMap = new Map(products.map(product => [product.id, product]));
          
          // 3. Calculate total amount with actual product prices
          enrichedItems = createOrderDto.items.map(item => {
            const product = productMap.get(item.productId);
            
            if (!product) {
              // Fallback to provided values if product not found
              const itemTotal = (item.unitPrice || 10) * item.quantity;
              subtotal += itemTotal;
              
              return {
                ...item,
                name: item.name || `Product ${item.productId}`,
                unitPrice: item.unitPrice || 10,
              };
            }
            
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
            
            return {
              ...item,
              name: product.name,
              unitPrice: product.price,
            };
          });
        } else {
          // Use values from the DTO if product service didn't return expected data
          enrichedItems = createOrderDto.items.map(item => {
            const price = item.unitPrice || 10; // Default price if not provided
            const itemTotal = price * item.quantity;
            subtotal += itemTotal;
            
            return {
              ...item,
              name: item.name || `Product ${item.productId}`,
              unitPrice: price,
            };
          });
        }
      } catch (error) {
        console.log('Product service unavailable, using fallback data', error.message);
        // Calculate based on provided values
        enrichedItems = createOrderDto.items.map(item => {
          const price = item.unitPrice || 10; // Default price if not provided
          const itemTotal = price * item.quantity;
          subtotal += itemTotal;
          
          return {
            ...item,
            name: item.name || `Product ${item.productId}`,
            unitPrice: price,
          };
        });
      }
      
      // Add delivery fee based on distance or flat rate
      // In a real app, this could be calculated based on distance
      const deliveryFee = 2.0;
      
      // Calculate service fee (30%)
      const serviceFee = subtotal * 0.3;
      
      // Total amount
      const totalAmount = subtotal + deliveryFee + serviceFee;

      // 4. Create the order with real product data
      const modifiedOrder = {
        ...createOrderDto,
        items: enrichedItems,
        restaurantName: restaurantName
      };
      
      const order = await this.orderRepository.createOrder(
        userId,
        modifiedOrder,
        totalAmount
      );
      
      return {
        orderId: order.orderId,
        status: order.status,
        totalAmount: order.totalAmount,
      };
    } catch (error) {
      // Log the error for debugging
      console.error('Error creating order:', error);
      
      // Re-throw application exceptions
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      // For other errors, throw a generic message
      throw new BadRequestException('Failed to create order. Please try again.');
    }
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
    
    // Convert status to lowercase if it's a string (coming from database)
    const currentStatus = typeof order.status === 'string'
      ? (order.status as string).toLowerCase()
      : order.status;
      
    console.log('Order status from DB:', order.status);
    console.log('Normalized status:', currentStatus);
    
    // Check if order can be canceled - using lowercase enum values
    const cancelableStatuses = [OrderStatus.PENDING, OrderStatus.ACCEPTED];
    if (!cancelableStatuses.includes(currentStatus as OrderStatus)) {
      throw new BadRequestException(`Order cannot be canceled in its current state: ${order.status}. An order can only be canceled when in ${cancelableStatuses.join(' or ')} state.`);
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
  private validateStatusTransition(currentStatus: OrderStatus | string, newStatus: OrderStatus): void {
    // Convert to lowercase if needed (database may return uppercase values)
    const normalizedCurrentStatus = typeof currentStatus === 'string' 
      ? currentStatus.toLowerCase() as OrderStatus
      : currentStatus;

    console.log('Current status:', currentStatus);
    console.log('Normalized current status:', normalizedCurrentStatus);
    console.log('New status:', newStatus);
      
    // Define valid status transitions
    const validTransitions = {
      [OrderStatus.PENDING]: [OrderStatus.ACCEPTED, OrderStatus.CANCELED],
      [OrderStatus.ACCEPTED]: [OrderStatus.IN_PROGRESS, OrderStatus.CANCELED],
      [OrderStatus.IN_PROGRESS]: [OrderStatus.READY],
      [OrderStatus.READY]: [OrderStatus.DELIVERED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELED]: [],
    };
    
    // Check if the transition map has the current status
    if (!validTransitions[normalizedCurrentStatus]) {
      console.error(`Invalid current status: '${currentStatus}' normalized to '${normalizedCurrentStatus}'`);
      throw new BadRequestException(
        `Current status '${currentStatus}' is not valid`
      );
    }
    
    // Check if the new status is in the list of valid transitions
    if (!validTransitions[normalizedCurrentStatus].includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status transition from ${currentStatus} to ${newStatus}. Valid transitions are: ${validTransitions[normalizedCurrentStatus].join(', ')}`
      );
    }
  }
} 