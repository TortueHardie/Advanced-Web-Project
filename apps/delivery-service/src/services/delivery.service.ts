import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DeliveryRepository } from '../repositories/delivery.repository';
import { DeliveryResponseDto } from '../dto/delivery.dto';
import { OrderStatus } from '../constants/order-status.enum';

@Injectable()
export class DeliveryService {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async getAvailableDeliveries(): Promise<DeliveryResponseDto[]> {
    return this.deliveryRepository.findByStatus(OrderStatus.READY);
  }

  async acceptDelivery(orderId: string, deliveryPersonId: string): Promise<{ message: string; orderId: string }> {
    const delivery = await this.deliveryRepository.findById(orderId);
    
    if (!delivery) {
      throw new NotFoundException(`Delivery with order ID ${orderId} not found`);
    }

    if (delivery.status !== OrderStatus.READY) {
      throw new BadRequestException(`Delivery with order ID ${orderId} is not available for acceptance`);
    }

    await this.deliveryRepository.updateStatusAndAssignee(
      orderId,
      OrderStatus.ACCEPTED,
      deliveryPersonId
    );

    return {
      message: 'Delivery accepted',
      orderId,
    };
  }

  async refuseDelivery(orderId: string): Promise<{ message: string; orderId: string }> {
    const delivery = await this.deliveryRepository.findById(orderId);
    
    if (!delivery) {
      throw new NotFoundException(`Delivery with order ID ${orderId} not found`);
    }

    // Si la livraison est déjà assignée, on ne peut pas la refuser
    if (delivery.status !== OrderStatus.READY) {
      throw new BadRequestException(`Delivery with order ID ${orderId} is not available for refusal`);
    }

    // Pas besoin de changer le statut ici car il reste READY

    return {
      message: 'Delivery refused',
      orderId,
    };
  }

  async updateDeliveryStatus(
    orderId: string,
    status: OrderStatus,
    deliveryPersonId: string
  ): Promise<DeliveryResponseDto> {
    const delivery = await this.deliveryRepository.findById(orderId);
    
    if (!delivery) {
      throw new NotFoundException(`Delivery with order ID ${orderId} not found`);
    }

    if (delivery.deliveryPersonId !== deliveryPersonId) {
      throw new BadRequestException(`You are not assigned to this delivery`);
    }

    // Vérification de la transition de statut
    const validTransitions = {
      [OrderStatus.ACCEPTED]: [OrderStatus.IN_PROGRESS],
      [OrderStatus.IN_PROGRESS]: [OrderStatus.DELIVERED],
      // Les autres statuts ne peuvent pas être modifiés par le livreur
    };

    if (!validTransitions[delivery.status]?.includes(status)) {
      throw new BadRequestException(`Invalid status transition from ${delivery.status} to ${status}`);
    }

    return this.deliveryRepository.updateStatus(orderId, status);
  }

  async getMyDeliveries(deliveryPersonId: string): Promise<DeliveryResponseDto[]> {
    return this.deliveryRepository.findMyDeliveries(deliveryPersonId);
  }
} 