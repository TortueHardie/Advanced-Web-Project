import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DeliveryRepository } from '../repositories/delivery.repository';
import { DeliveryResponseDto } from '../dto/delivery.dto';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class DeliveryService {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async getAvailableDeliveries(): Promise<DeliveryResponseDto[]> {
    try {
      return await this.deliveryRepository.findByStatus(DeliveryStatus.READY);
    } catch (error) {
      throw new BadRequestException('Failed to fetch available deliveries');
    }
  }

  async acceptDelivery(orderId: number, deliveryPersonId: number) {
    try {
      const delivery = await this.deliveryRepository.findById(orderId);
      if (!delivery) {
        throw new NotFoundException(`Delivery with ID ${orderId} not found`);
      }

      if (delivery.status !== DeliveryStatus.READY) {
        throw new BadRequestException(`Delivery with ID ${orderId} is not available for acceptance`);
      }

      if (delivery.deliveryPersonId) {
        throw new BadRequestException(`Delivery with ID ${orderId} is already assigned`);
      }

      await this.deliveryRepository.updateStatusAndAssignee(orderId, DeliveryStatus.ASSIGNED, deliveryPersonId);
      return {
        message: 'Delivery accepted',
        orderId,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to accept delivery');
    }
  }

  async refuseDelivery(orderId: number) {
    try {
      const delivery = await this.deliveryRepository.findById(orderId);
      if (!delivery) {
        throw new NotFoundException(`Delivery with ID ${orderId} not found`);
      }

      if (delivery.status !== DeliveryStatus.ASSIGNED) {
        throw new BadRequestException(`Delivery with ID ${orderId} is not in a state that can be refused`);
      }

      await this.deliveryRepository.updateStatus(orderId, DeliveryStatus.READY);
      return {
        message: 'Delivery refused',
        orderId,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to refuse delivery');
    }
  }

  async updateDeliveryStatus(orderId: number, status: DeliveryStatus, deliveryPersonId: number) {
    try {
      const delivery = await this.deliveryRepository.findById(orderId);
      if (!delivery) {
        throw new NotFoundException(`Delivery with ID ${orderId} not found`);
      }

      if (delivery.deliveryPersonId !== deliveryPersonId) {
        throw new NotFoundException(`Delivery with ID ${orderId} is not assigned to you`);
      }

      if (!this.isValidStatusTransition(delivery.status, status)) {
        throw new BadRequestException(`Invalid status transition from ${delivery.status} to ${status}`);
      }

      return await this.deliveryRepository.updateStatus(orderId, status);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to update delivery status');
    }
  }

  async getMyDeliveries(deliveryPersonId: number): Promise<DeliveryResponseDto[]> {
    try {
      return await this.deliveryRepository.findMyDeliveries(deliveryPersonId);
    } catch (error) {
      throw new BadRequestException('Failed to fetch your deliveries');
    }
  }

  private isValidStatusTransition(currentStatus: DeliveryStatus, newStatus: DeliveryStatus): boolean {
    const validTransitions: Record<DeliveryStatus, DeliveryStatus[]> = {
      [DeliveryStatus.READY]: [],
      [DeliveryStatus.ASSIGNED]: [DeliveryStatus.PICKUP_IN_PROGRESS],
      [DeliveryStatus.PICKUP_IN_PROGRESS]: [DeliveryStatus.ON_THE_WAY],
      [DeliveryStatus.ON_THE_WAY]: [DeliveryStatus.DELIVERED],
      [DeliveryStatus.DELIVERED]: []
    };

    return validTransitions[currentStatus]?.includes(newStatus) ?? false;
  }
} 