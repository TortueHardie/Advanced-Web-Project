import { Controller, Get, Post, Body, Param, Put, Delete, Headers, UnauthorizedException, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiHeader, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@ApiTags('Commandes')
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer une nouvelle commande' })
  @ApiResponse({ status: 201, description: 'Commande créée avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async createOrder(@Headers('authorization') authHeader: string, @Body() createOrderDto: any) {
    return this.forwardRequest(`${this.orderServiceUrl}`, 'POST', authHeader, createOrderDto);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer les commandes de l\'utilisateur connecté' })
  @ApiResponse({ status: 200, description: 'Liste des commandes' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async getUserOrders(@Headers('authorization') authHeader: string) {
    return this.forwardRequest(`${this.orderServiceUrl}/me`, 'GET', authHeader);
  }

  @Get('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer toutes les commandes (admin/restaurant)' })
  @ApiResponse({ status: 200, description: 'Liste de toutes les commandes' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 403, description: 'Accès interdit - rôle insuffisant' })
  async getAdminOrders(@Headers('authorization') authHeader: string) {
    return this.forwardRequest(`${this.orderServiceUrl}/admin`, 'GET', authHeader);
  }

  @Get(':orderId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer les détails d\'une commande' })
  @ApiParam({ name: 'orderId', description: 'ID de la commande' })
  @ApiResponse({ status: 200, description: 'Détails de la commande' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async getOrderById(@Headers('authorization') authHeader: string, @Param('orderId') orderId: string) {
    return this.forwardRequest(`${this.orderServiceUrl}/${orderId}`, 'GET', authHeader);
  }

  @Put(':orderId/cancel')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Annuler une commande' })
  @ApiParam({ name: 'orderId', description: 'ID de la commande à annuler' })
  @ApiResponse({ status: 200, description: 'Commande annulée avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async cancelOrder(@Headers('authorization') authHeader: string, @Param('orderId') orderId: string) {
    return this.forwardRequest(`${this.orderServiceUrl}/${orderId}/cancel`, 'PUT', authHeader);
  }
} 