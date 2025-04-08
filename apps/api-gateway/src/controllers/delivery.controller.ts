import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DeliveryResponseDto, UpdateDeliveryStatusDto } from '../dto';
import { AccessToken } from '../decorators';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
  private readonly deliveryServiceUrl = process.env.DELIVERY_SERVICE_URL || 'http://location-service:3003';

  constructor(private readonly httpService: HttpService) {}

  private async forwardRequest(url: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', authHeader?: string, body?: any) {
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
        case 'PATCH':
          response = await firstValueFrom(
            this.httpService.patch(url, body, { headers })
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

  @Get('available')
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Liste des commandes disponibles à la livraison',
    description: 'Récupère toutes les commandes avec le statut "ready" qui sont disponibles pour être acceptées par un livreur'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des commandes disponibles',
    type: [DeliveryResponseDto]
  })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async getAvailableDeliveries(@AccessToken() authHeader: string): Promise<DeliveryResponseDto[]> {
    return this.forwardRequest(`${this.deliveryServiceUrl}/delivery/available`, 'GET', authHeader);
  }

  @Patch(':orderId/accept')
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Accepter une livraison',
    description: 'Permet à un livreur d\'accepter une commande disponible. La commande passe alors au statut "assigned".'
  })
  @ApiParam({ name: 'orderId', description: 'ID de la commande à accepter' })
  @ApiResponse({ 
    status: 200, 
    description: 'Livraison acceptée avec succès'
  })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async acceptDelivery(@AccessToken() authHeader: string, @Param('orderId') orderId: string) {
    return this.forwardRequest(`${this.deliveryServiceUrl}/delivery/${orderId}/accept`, 'PATCH', authHeader);
  }

  @Patch(':orderId/refuse')
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Refuser une livraison',
    description: 'Permet à un livreur de refuser une commande qui lui a été proposée.'
  })
  @ApiParam({ name: 'orderId', description: 'ID de la commande à refuser' })
  @ApiResponse({ 
    status: 200, 
    description: 'Livraison refusée avec succès'
  })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async refuseDelivery(@AccessToken() authHeader: string, @Param('orderId') orderId: string) {
    return this.forwardRequest(`${this.deliveryServiceUrl}/delivery/${orderId}/refuse`, 'PATCH', authHeader);
  }

  @Patch(':orderId/status')
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Mettre à jour le statut de la livraison',
    description: 'Permet à un livreur de mettre à jour le statut d\'une livraison qu\'il a acceptée.'
  })
  @ApiParam({ name: 'orderId', description: 'ID de la commande à mettre à jour' })
  @ApiBody({ type: UpdateDeliveryStatusDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Statut mis à jour avec succès',
    type: DeliveryResponseDto
  })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée ou non assignée au livreur' })
  async updateDeliveryStatus(
    @AccessToken() authHeader: string, 
    @Param('orderId') orderId: string,
    @Body() updateStatusDto: UpdateDeliveryStatusDto,
  ): Promise<DeliveryResponseDto> {
    return this.forwardRequest(`${this.deliveryServiceUrl}/delivery/${orderId}/status`, 'PATCH', authHeader, updateStatusDto);
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Récupérer mes livraisons',
    description: 'Récupère toutes les livraisons assignées au livreur connecté, qu\'elles soient en cours ou terminées.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des livraisons du livreur',
    type: [DeliveryResponseDto]
  })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async getMyDeliveries(@AccessToken() authHeader: string): Promise<DeliveryResponseDto[]> {
    return this.forwardRequest(`${this.deliveryServiceUrl}/delivery/me`, 'GET', authHeader);
  }
} 