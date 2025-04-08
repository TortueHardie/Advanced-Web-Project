import { Controller, Get, Patch, Param, Body, UseGuards, Req, NotFoundException } from '@nestjs/common';
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
    summary: 'Liste des commandes disponibles à la livraison',
    description: 'Récupère toutes les commandes avec le statut "ready" qui sont disponibles pour être acceptées par un livreur'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des commandes disponibles',
    type: [DeliveryResponseDto] 
  })
  async getAvailableDeliveries(): Promise<DeliveryResponseDto[]> {
    return this.deliveryService.getAvailableDeliveries();
  }

  @Patch(':orderId/accept')
  @ApiOperation({ 
    summary: 'Accepter une livraison',
    description: 'Permet à un livreur d\'accepter une commande disponible. La commande passe alors au statut "assigned".'
  })
  @ApiParam({ name: 'orderId', description: 'ID de la commande à accepter', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Livraison acceptée avec succès',
    schema: {
      example: {
        message: 'Delivery accepted',
        orderId: 1245
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async acceptDelivery(
    @Param('orderId') orderId: string,
    @Req() req: RequestWithUser,
  ) {
    const deliveryPersonId = req.user.id;
    return this.deliveryService.acceptDelivery(parseInt(orderId), deliveryPersonId);
  }

  @Patch(':orderId/refuse')
  @ApiOperation({ 
    summary: 'Refuser une livraison',
    description: 'Permet à un livreur de refuser une commande qui lui a été proposée.'
  })
  @ApiParam({ name: 'orderId', description: 'ID de la commande à refuser', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Livraison refusée avec succès',
    schema: {
      example: {
        message: 'Delivery refused',
        orderId: 1245
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  async refuseDelivery(@Param('orderId') orderId: string) {
    return this.deliveryService.refuseDelivery(parseInt(orderId));
  }

  @Patch(':orderId/status')
  @ApiOperation({ 
    summary: 'Mettre à jour le statut de la livraison',
    description: 'Permet à un livreur de mettre à jour le statut d\'une livraison qu\'il a acceptée.'
  })
  @ApiParam({ name: 'orderId', description: 'ID de la commande à mettre à jour', type: 'number' })
  @ApiResponse({ 
    status: 200, 
    description: 'Statut mis à jour avec succès',
    type: DeliveryResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Commande non trouvée ou non assignée au livreur' })
  async updateDeliveryStatus(
    @Param('orderId') orderId: string,
    @Body() updateStatusDto: UpdateDeliveryStatusDto,
    @Req() req: RequestWithUser,
  ) {
    const deliveryPersonId = req.user.id;
    return this.deliveryService.updateDeliveryStatus(parseInt(orderId), updateStatusDto.status, deliveryPersonId);
  }

  @Get('me')
  @ApiOperation({ 
    summary: 'Récupérer mes livraisons',
    description: 'Récupère toutes les livraisons assignées au livreur connecté, qu\'elles soient en cours ou terminées.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des livraisons du livreur',
    type: [DeliveryResponseDto] 
  })
  async getMyDeliveries(@Req() req: RequestWithUser): Promise<DeliveryResponseDto[]> {
    const deliveryPersonId = req.user.id;
    return this.deliveryService.getMyDeliveries(deliveryPersonId);
  }

  // Méthodes pour communication entre microservices
  @MessagePattern({ cmd: 'get_available_deliveries' })
  async getAllAvailableDeliveries(): Promise<DeliveryResponseDto[]> {
    try {
      return await this.deliveryService.getAvailableDeliveries();
    } catch (error) {
      if (error instanceof NotFoundException) {
        return [];
      }
      throw error;
    }
  }

  @MessagePattern({ cmd: 'accept_delivery' })
  async acceptDeliveryByMicroservice(data: { orderId: number, deliveryPersonId: number }): Promise<any> {
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
  async refuseDeliveryByMicroservice(orderId: number): Promise<any> {
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
    orderId: number, 
    status: string, 
    deliveryPersonId: number 
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
  async getDeliveriesByDeliveryPerson(deliveryPersonId: number): Promise<DeliveryResponseDto[]> {
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