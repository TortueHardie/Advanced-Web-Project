import { Controller, Get, Patch, Param, Body, UseGuards, Req, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { DeliveryService } from '../services/delivery.service';
import { DeliveryResponseDto, UpdateDeliveryStatusDto } from '../dto/delivery.dto';
import { DeliveryGuard } from '../guards/delivery.guard';
import { RequestWithUser } from '../interfaces/request.interface';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('Delivery')
@Controller('delivery')
@ApiBearerAuth()
@UseGuards(DeliveryGuard)
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('available')
  @ApiOperation({
    summary: 'Récupérer les livraisons disponibles',
    description: 'Permet aux livreurs de voir toutes les commandes prêtes à être livrées',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des livraisons disponibles récupérée avec succès',
    type: [DeliveryResponseDto],
  })
  async getAvailableDeliveries(): Promise<DeliveryResponseDto[]> {
    return this.deliveryService.getAvailableDeliveries();
  }

  @Patch(':orderId/accept')
  @ApiOperation({
    summary: 'Accepter une livraison',
    description: 'Permet à un livreur d\'accepter une livraison et de se l\'assigner',
  })
  @ApiParam({ name: 'orderId', description: 'ID de la commande à accepter', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Livraison acceptée avec succès',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Delivery accepted' },
        orderId: { type: 'string', example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Livraison non trouvée' })
  @ApiResponse({ status: 400, description: 'Livraison non disponible' })
  async acceptDelivery(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Req() req: RequestWithUser,
  ): Promise<{ message: string; orderId: string }> {
    const deliveryPersonId = req.user.userId;
    return this.deliveryService.acceptDelivery(orderId, deliveryPersonId);
  }

  @Patch(':orderId/refuse')
  @ApiOperation({
    summary: 'Refuser une livraison',
    description: 'Permet à un livreur de refuser une livraison qu\'il avait acceptée',
  })
  @ApiParam({ name: 'orderId', description: 'ID de la commande à refuser', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Livraison refusée avec succès',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Delivery refused' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Livraison non trouvée' })
  async refuseDelivery(
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ): Promise<{ message: string }> {
    return this.deliveryService.refuseDelivery(orderId);
  }

  @Patch(':orderId/status')
  @ApiOperation({
    summary: 'Mettre à jour le statut d\'une livraison',
    description: 'Permet à un livreur de mettre à jour le statut d\'une livraison (en cours, livrée, etc.)',
  })
  @ApiParam({ name: 'orderId', description: 'ID de la commande à mettre à jour', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Statut de livraison mis à jour avec succès',
    type: DeliveryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Livraison non trouvée' })
  @ApiResponse({ status: 400, description: 'Mise à jour non autorisée' })
  async updateDeliveryStatus(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() updateStatusDto: UpdateDeliveryStatusDto,
    @Req() req: RequestWithUser,
  ): Promise<DeliveryResponseDto | null> {
    const deliveryPersonId = req.user.userId;
    return this.deliveryService.updateDeliveryStatus(orderId, updateStatusDto.status, deliveryPersonId);
  }

  @Get('me')
  @ApiOperation({
    summary: 'Récupérer mes livraisons',
    description: 'Permet à un livreur de voir toutes les livraisons qui lui sont assignées',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des livraisons du livreur récupérée avec succès',
    type: [DeliveryResponseDto],
  })
  async getMyDeliveries(@Req() req: RequestWithUser): Promise<DeliveryResponseDto[]> {
    const deliveryPersonId = req.user.userId;
    return this.deliveryService.getMyDeliveries(deliveryPersonId);
  }

  // Méthodes pour la communication entre microservices

  @MessagePattern({ cmd: 'accept_delivery' })
  async acceptDeliveryByMicroservice(data: { orderId: string, deliveryPersonId: string }): Promise<any> {
    try {
      return await this.deliveryService.acceptDelivery(data.orderId, data.deliveryPersonId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { success: false, message: 'Delivery not found' };
      }
      throw error;
    }
  }

  @MessagePattern({ cmd: 'refuse_delivery' })
  async refuseDeliveryByMicroservice(orderId: string): Promise<any> {
    try {
      return await this.deliveryService.refuseDelivery(orderId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { success: false, message: 'Delivery not found' };
      }
      throw error;
    }
  }

  @MessagePattern({ cmd: 'update_delivery_status' })
  async updateDeliveryStatusByMicroservice(data: { 
    orderId: string, 
    status: string, 
    deliveryPersonId: string 
  }): Promise<DeliveryResponseDto | null> {
    try {
      return await this.deliveryService.updateDeliveryStatus(
        data.orderId, 
        data.status as any, 
        data.deliveryPersonId
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return null;
      }
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get_my_deliveries' })
  async getDeliveriesByDeliveryPerson(deliveryPersonId: string): Promise<DeliveryResponseDto[]> {
    try {
      return await this.deliveryService.getMyDeliveries(deliveryPersonId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return [];
      }
      throw error;
    }
  }
} 