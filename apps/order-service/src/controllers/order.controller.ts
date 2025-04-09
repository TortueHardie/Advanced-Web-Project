import { Controller, Get, Post, Body, Param, Put, Patch, Headers, UnauthorizedException, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { MessagePattern } from '@nestjs/microservices';
import { OrderStatus } from '../dto/update-order-status.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { OrderCreatedDto, OrderSummaryDto, OrderDetailDto, MessageResponseDto, AdminOrderSummaryDto } from '../dto/response.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // This is a mock auth implementation
  // In a real app, you would use a proper auth guard
  private getUserIdFromToken(authHeader: string): number {
    // For development and testing, allow requests without an auth header
    // This is NOT recommended for production
    if (!authHeader) {
      console.warn('No authorization header provided - using default user ID for development');
      return 1; // Default user ID for development
    }
    
    // Parse token from Bearer format
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.replace('Bearer ', '')
      : authHeader;
    
    try {
      // For our development tokens, parse the base64 payload
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) {
        console.warn('Invalid token format, using default user ID');
        return 1; // Fallback for testing
      }
      
      // Decode base64
      const payload = JSON.parse(
        Buffer.from(payloadBase64, 'base64').toString('utf8')
      );
      
      return payload.sub || 1;
    } catch (error) {
      console.warn('Token parsing error:', error);
      return 1; // Fallback for testing
    }
  }

  private isAdmin(authHeader: string): boolean {
    if (!authHeader) return false;
    
    try {
      // Parse token from Bearer format
      const token = authHeader.startsWith('Bearer ') 
        ? authHeader.replace('Bearer ', '')
        : authHeader;
      
      // For our development tokens, parse the base64 payload
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) {
        return authHeader.includes('admin'); // Fallback
      }
      
      // Decode base64
      const payload = JSON.parse(
        Buffer.from(payloadBase64, 'base64').toString('utf8')
      );
      
      return payload.role === 'admin';
    } catch (error) {
      return authHeader.includes('admin'); // Fallback for testing
    }
  }

  private isRestaurant(authHeader: string): boolean {
    if (!authHeader) return false;
    
    try {
      // Parse token from Bearer format
      const token = authHeader.startsWith('Bearer ') 
        ? authHeader.replace('Bearer ', '')
        : authHeader;
      
      // For our development tokens, parse the base64 payload
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) {
        return authHeader.includes('restaurant'); // Fallback
      }
      
      // Decode base64
      const payload = JSON.parse(
        Buffer.from(payloadBase64, 'base64').toString('utf8')
      );
      
      return payload.role === 'restaurant';
    } catch (error) {
      return authHeader.includes('restaurant'); // Fallback for testing
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Create a new order', description: 'Create a new order with the given items, delivery address, and payment method' })
  @ApiBody({ type: CreateOrderDto, description: 'Order details including restaurant, items, delivery address, and payment method' })
  @ApiResponse({ status: 201, description: 'Order created successfully', type: OrderCreatedDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createOrder(
    @Headers() headers: any,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    // Debug the headers received
    console.log('Headers received:', headers);
    
    // Extract authorization headers (can be in different formats)
    const authHeader = headers.authorization || headers.Authorization;
    console.log('Auth header found:', authHeader);
    
    const userId = this.getUserIdFromToken(authHeader);
    console.log('User ID extracted:', userId);
    
    return this.orderService.createOrder(userId, createOrderDto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Get current user orders', description: 'Retrieve order history for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of user orders', type: [OrderSummaryDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserOrders(@Headers('authorization') auth: string) {
    const userId = this.getUserIdFromToken(auth);
    return this.orderService.getUserOrders(userId);
  }
  
  @Get('admin')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Get all orders (Admin/Restaurant)', description: 'Retrieve all orders for administration purposes. Reserved for restaurant owners and admins.' })
  @ApiResponse({ status: 200, description: 'List of all orders', type: [AdminOrderSummaryDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires admin/restaurant role' })
  async getAdminOrders(@Headers('authorization') auth: string) {
    // Check if user has admin or restaurant role
    if (!this.isAdmin(auth) && !this.isRestaurant(auth)) {
      throw new UnauthorizedException('Only restaurant or admin can access all orders');
    }
    
    return this.orderService.getAdminOrders();
  }

  @Get(':orderId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Get order details', description: 'Retrieve detailed information about a specific order' })
  @ApiParam({ name: 'orderId', description: 'Order ID', example: '1245' })
  @ApiResponse({ status: 200, description: 'Order details', type: OrderDetailDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your order' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrder(
    @Headers('authorization') auth: string,
    @Param('orderId') orderId: string,
  ) {
    const userId = this.getUserIdFromToken(auth);
    const order = await this.orderService.getOrderById(userId, parseInt(orderId, 10));
    
    // Format response to match API spec
    return {
      orderId: order.orderId,
      restaurantName: order.restaurantName,
      items: order.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      })),
      deliveryFees: order.deliveryFees,
      serviceFees: order.serviceFees,
      totalAmount: order.totalAmount,
      status: order.status,
      timestamps: {
        createdAt: order.timestamps.createdAt,
        acceptedAt: order.timestamps.acceptedAt,
        deliveredAt: order.timestamps.deliveredAt
      }
    };
  }

  @Put(':orderId/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Cancel an order', description: 'Cancel an order if it is in pending or accepted state' })
  @ApiParam({ name: 'orderId', description: 'Order ID to cancel', example: '1245' })
  @ApiResponse({ status: 200, description: 'Order canceled successfully', type: MessageResponseDto })
  @ApiResponse({ status: 400, description: 'Cannot cancel order in current state' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your order' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async cancelOrder(
    @Headers('authorization') auth: string,
    @Param('orderId') orderId: string,
  ) {
    const userId = this.getUserIdFromToken(auth);
    return this.orderService.cancelOrder(userId, parseInt(orderId, 10));
  }

  @Patch(':orderId/status')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Update order status', description: 'Update the status of an order. Reserved for restaurant owners and admins.' })
  @ApiParam({ name: 'orderId', description: 'Order ID to update', example: '1245' })
  @ApiBody({ type: UpdateOrderStatusDto, description: 'New status for the order' })
  @ApiResponse({ status: 200, description: 'Order status updated', type: MessageResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires admin/restaurant role' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async updateOrderStatus(
    @Headers('authorization') auth: string,
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    // Check if user has admin or restaurant role
    if (!this.isAdmin(auth) && !this.isRestaurant(auth)) {
      throw new UnauthorizedException('Only restaurant or admin can update order status');
    }
    
    return this.orderService.updateOrderStatus(
      parseInt(orderId, 10),
      updateOrderStatusDto.status,
    );
  }

  // Methods for microservice communication

  @MessagePattern({ cmd: 'create_order' })
  @ApiTags('Microservice')
  @ApiOperation({ summary: 'Create order (microservice)', description: 'Internal microservice method for creating orders' })
  async createOrderMessage(data: { userId: number, order: CreateOrderDto }) {
    return this.orderService.createOrder(data.userId, data.order);
  }

  @MessagePattern({ cmd: 'get_user_orders' })
  @ApiTags('Microservice')
  @ApiOperation({ summary: 'Get user orders (microservice)', description: 'Internal microservice method for retrieving user orders' })
  async getUserOrdersMessage(userId: number) {
    return this.orderService.getUserOrders(userId);
  }

  @MessagePattern({ cmd: 'get_order_by_id' })
  @ApiTags('Microservice')
  @ApiOperation({ summary: 'Get order by ID (microservice)', description: 'Internal microservice method for retrieving an order by ID' })
  async getOrderByIdMessage(data: { userId: number, orderId: number }) {
    try {
      return await this.orderService.getOrderById(data.userId, data.orderId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return null;
      }
      throw error;
    }
  }

  @MessagePattern({ cmd: 'cancel_order' })
  @ApiTags('Microservice')
  @ApiOperation({ summary: 'Cancel order (microservice)', description: 'Internal microservice method for canceling an order' })
  async cancelOrderMessage(data: { userId: number, orderId: number }) {
    return this.orderService.cancelOrder(data.userId, data.orderId);
  }

  @MessagePattern({ cmd: 'update_order_status' })
  @ApiTags('Microservice')
  @ApiOperation({ summary: 'Update order status (microservice)', description: 'Internal microservice method for updating order status' })
  async updateOrderStatusMessage(data: { orderId: number, status: OrderStatus }) {
    return this.orderService.updateOrderStatus(data.orderId, data.status);
  }

  @MessagePattern({ cmd: 'get_admin_orders' })
  @ApiTags('Microservice')
  @ApiOperation({ summary: 'Get admin orders (microservice)', description: 'Internal microservice method for retrieving all orders for admin/restaurant' })
  async getAdminOrdersMessage() {
    return this.orderService.getAdminOrders();
  }
} 