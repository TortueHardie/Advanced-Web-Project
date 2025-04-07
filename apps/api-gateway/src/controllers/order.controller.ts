import { Controller, Get, Post, Body, Param, Put, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { 
  CreateOrderDto, 
  UpdateOrderStatusDto,
  OrderCreatedDto,
  OrderSummaryDto,
  OrderDetailDto,
  MessageResponseDto,
  AdminOrderSummaryDto
} from '../dto/order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  private client: any;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.ORDER_SERVICE_HOST || 'order-service',
        port: parseInt(process.env.ORDER_SERVICE_PORT || '4002'),
      },
    });
  }

  @Post()
  @ApiBearerAuth('Authorization')
  @ApiOperation({ 
    summary: 'Create a new order',
    description: 'Create a new order with the given items, delivery address, and payment method'
  })
  @ApiHeader({ 
    name: 'authorization', 
    description: 'Auth token (Bearer) - Use the Authorize button at the top for authentication', 
    required: true 
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Order created successfully', 
    type: OrderCreatedDto 
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createOrder(@Headers() headers: any, @Body() createOrderDto: CreateOrderDto) {
    try {
      const auth = headers.authorization || headers.Authorization;
      // Extract user ID from the token - the order service will handle this
      
      return await firstValueFrom(
        this.client.send({ cmd: 'create_order' }, { 
          userId: 0, // Placeholder, the service will extract from token
          order: createOrderDto 
        })
      );
    } catch (error) {
      throw new HttpException(error.message || 'Error creating order', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('me')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ 
    summary: 'Get current user orders',
    description: 'Retrieve order history for the authenticated user'
  })
  @ApiHeader({ 
    name: 'authorization', 
    description: 'Auth token (Bearer) - Use the Authorize button at the top for authentication', 
    required: true 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of user orders', 
    type: [OrderSummaryDto] 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserOrders(@Headers('authorization') auth: string) {
    try {
      // The order service expects just the user ID
      // In our case we'll pass the auth token and let the service extract the user ID
      return await firstValueFrom(
        this.client.send({ cmd: 'get_user_orders' }, 0) // Placeholder - service will extract ID from the token
      );
    } catch (error) {
      throw new HttpException(error.message || 'Error retrieving orders', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('admin')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ 
    summary: 'Get all orders (Admin/Restaurant only)',
    description: 'Retrieve all orders for administration purposes. Reserved for restaurant owners and admins.'
  })
  @ApiHeader({ 
    name: 'authorization', 
    description: 'Auth token with admin/restaurant role - Use the Authorize button at the top for authentication', 
    required: true 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all orders', 
    type: [AdminOrderSummaryDto] 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires admin/restaurant role' })
  async getAdminOrders(@Headers('authorization') auth: string) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'get_admin_orders' }, {})
      );
    } catch (error) {
      throw new HttpException(error.message || 'Error retrieving admin orders', HttpStatus.FORBIDDEN);
    }
  }

  @Get(':orderId')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ 
    summary: 'Get order details',
    description: 'Retrieve detailed information about a specific order'
  })
  @ApiParam({ name: 'orderId', description: 'Order ID to retrieve', example: '1245' })
  @ApiHeader({ 
    name: 'authorization', 
    description: 'Auth token (Bearer) - Use the Authorize button at the top for authentication', 
    required: true 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Order details', 
    type: OrderDetailDto 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your order' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrder(@Headers('authorization') auth: string, @Param('orderId') orderId: string) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'get_order_by_id' }, { 
          userId: 0, // Placeholder, the service will extract from token
          orderId: parseInt(orderId, 10) 
        })
      );
    } catch (error) {
      throw new HttpException(error.message || 'Order not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':orderId/cancel')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ 
    summary: 'Cancel an order',
    description: 'Cancel an order if it is in pending or accepted state'
  })
  @ApiParam({ name: 'orderId', description: 'Order ID to cancel', example: '1245' })
  @ApiHeader({ 
    name: 'authorization', 
    description: 'Auth token (Bearer) - Use the Authorize button at the top for authentication', 
    required: true 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Order canceled successfully', 
    type: MessageResponseDto 
  })
  @ApiResponse({ status: 400, description: 'Cannot cancel order in current state' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not your order' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async cancelOrder(@Headers('authorization') auth: string, @Param('orderId') orderId: string) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'cancel_order' }, { 
          userId: 0, // Placeholder, the service will extract from token
          orderId: parseInt(orderId, 10) 
        })
      );
    } catch (error) {
      throw new HttpException(error.message || 'Error canceling order', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':orderId/status')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ 
    summary: 'Update order status (Admin/Restaurant only)',
    description: 'Update the status of an order. Reserved for restaurant owners and admins.'
  })
  @ApiParam({ name: 'orderId', description: 'Order ID to update', example: '1245' })
  @ApiHeader({ 
    name: 'authorization', 
    description: 'Auth token with admin/restaurant role - Use the Authorize button at the top for authentication', 
    required: true 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Order status updated successfully', 
    type: MessageResponseDto 
  })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires admin/restaurant role' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async updateOrderStatus(
    @Headers('authorization') auth: string,
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    try {
      return await firstValueFrom(
        this.client.send(
          { cmd: 'update_order_status' },
          { 
            orderId: parseInt(orderId, 10), 
            status: updateOrderStatusDto.status 
          }
        )
      );
    } catch (error) {
      throw new HttpException(error.message || 'Error updating order status', HttpStatus.FORBIDDEN);
    }
  }
} 