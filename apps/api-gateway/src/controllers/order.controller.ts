import { Controller, Get, Post, Body, Param, Put, Delete, UnauthorizedException, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto, OrderResponseDto, OrderListResponseDto } from '../dto';
import { AccessToken } from '../decorators';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  private readonly orderServiceUrl = process.env.ORDER_SERVICE_URL || 'http://order-service:3002';

  constructor(private readonly httpService: HttpService) {}

  private async forwardRequest(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', authHeader?: string, body?: any) {
    const headers: Record<string, string> = {};
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    try {
      let response;
      switch (method) {
        case 'GET':
          response = await firstValueFrom(
            this.httpService.get(url, { headers })
          );
          break;
        case 'POST':
          response = await firstValueFrom(
            this.httpService.post(url, body, { headers })
          );
          break;
        case 'PUT':
          response = await firstValueFrom(
            this.httpService.put(url, body, { headers })
          );
          break;
        case 'DELETE':
          response = await firstValueFrom(
            this.httpService.delete(url, { headers })
          );
          break;
      }
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new UnauthorizedException(error.response?.data?.message || 'Non autorisé');
      }
      throw error;
    }
  }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Créer une nouvelle commande' })
  @ApiResponse({ status: 201, description: 'Commande créée avec succès', type: OrderResponseDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async createOrder(@AccessToken() authHeader: string, @Body() createOrderDto: CreateOrderDto) {
    return this.forwardRequest(`${this.orderServiceUrl}`, 'POST', authHeader, createOrderDto);
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer les commandes de l\'utilisateur connecté' })
  @ApiResponse({ status: 200, description: 'Liste des commandes', type: OrderListResponseDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async getUserOrders(@AccessToken() authHeader: string) {
    return this.forwardRequest(`${this.orderServiceUrl}/me`, 'GET', authHeader);
  }

  @Get('admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Récupérer toutes les commandes (admin/restaurant)',
    description: 'Nécessite le rôle ADMIN ou RESTAURATEUR'
  })
  @ApiResponse({ status: 200, description: 'Liste de toutes les commandes', type: OrderListResponseDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Accès interdit - rôle insuffisant' })
  async getAdminOrders(@AccessToken() authHeader: string) {
    return this.forwardRequest(`${this.orderServiceUrl}/admin`, 'GET', authHeader);
  }

  @Get(':orderId')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer les détails d\'une commande' })
  @ApiParam({ name: 'orderId', description: 'ID de la commande' })
  @ApiResponse({ status: 200, description: 'Détails de la commande', type: OrderResponseDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async getOrderById(@AccessToken() authHeader: string, @Param('orderId') orderId: string) {
    return this.forwardRequest(`${this.orderServiceUrl}/${orderId}`, 'GET', authHeader);
  }

  @Put(':orderId/cancel')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Annuler une commande' })
  @ApiParam({ name: 'orderId', description: 'ID de la commande à annuler' })
  @ApiResponse({ status: 200, description: 'Commande annulée avec succès', type: OrderResponseDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async cancelOrder(@AccessToken() authHeader: string, @Param('orderId') orderId: string) {
    return this.forwardRequest(`${this.orderServiceUrl}/${orderId}/cancel`, 'PUT', authHeader);
  }
} 