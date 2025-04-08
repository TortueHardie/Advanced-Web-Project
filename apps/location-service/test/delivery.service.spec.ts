import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from '../src/services/delivery.service';
import { DeliveryRepository } from '../src/repositories/delivery.repository';
import { OrderStatus } from '../src/constants/order-status.enum';
import { NotFoundException } from '@nestjs/common';

describe('DeliveryService', () => {
  let service: DeliveryService;
  let repository: DeliveryRepository;

  const mockDeliveryRepository = {
    findByStatus: jest.fn(),
    findById: jest.fn(),
    updateStatus: jest.fn(),
    updateStatusAndAssignee: jest.fn(),
    findMyDeliveries: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryService,
        {
          provide: DeliveryRepository,
          useValue: mockDeliveryRepository,
        },
      ],
    }).compile();

    service = module.get<DeliveryService>(DeliveryService);
    repository = module.get<DeliveryRepository>(DeliveryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAvailableDeliveries', () => {
    it('should return available deliveries', async () => {
      const mockDeliveries = [
        {
          orderId: '1',
          restaurantName: 'Restaurant 1',
          pickupAddress: 'Paris',
          deliveryAddress: '123 rue de Paris',
          totalAmount: 25.99,
          status: OrderStatus.READY,
        },
        {
          orderId: '2',
          restaurantName: 'Restaurant 2',
          pickupAddress: 'Lyon',
          deliveryAddress: '456 rue de Lyon',
          totalAmount: 35.99,
          status: OrderStatus.READY,
        },
      ];

      mockDeliveryRepository.findByStatus.mockResolvedValue(mockDeliveries);

      const result = await service.getAvailableDeliveries();
      
      expect(result).toEqual(mockDeliveries);
      expect(mockDeliveryRepository.findByStatus).toHaveBeenCalledWith(OrderStatus.READY);
    });
  });

  describe('acceptDelivery', () => {
    it('should accept a delivery', async () => {
      const orderId = '1';
      const deliveryPersonId = 'user123';
      
      const mockDelivery = {
        orderId,
        restaurantName: 'Restaurant 1',
        pickupAddress: 'Paris',
        deliveryAddress: '123 rue de Paris',
        totalAmount: 25.99,
        status: OrderStatus.ACCEPTED,
        deliveryPersonId,
      };

      mockDeliveryRepository.findById.mockResolvedValue({
        ...mockDelivery,
        status: OrderStatus.READY,
        deliveryPersonId: null,
      });
      
      mockDeliveryRepository.updateStatusAndAssignee.mockResolvedValue(mockDelivery);

      const result = await service.acceptDelivery(orderId, deliveryPersonId);
      
      expect(result).toEqual({
        message: 'Delivery accepted',
        orderId,
      });
      expect(mockDeliveryRepository.findById).toHaveBeenCalledWith(orderId);
      expect(mockDeliveryRepository.updateStatusAndAssignee).toHaveBeenCalledWith(
        orderId,
        OrderStatus.ACCEPTED,
        deliveryPersonId
      );
    });

    it('should throw NotFoundException if delivery is not found', async () => {
      mockDeliveryRepository.findById.mockResolvedValue(null);

      await expect(service.acceptDelivery('1', 'user123')).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if delivery is not in READY status', async () => {
      const mockDelivery = {
        orderId: '1',
        status: OrderStatus.IN_PROGRESS,
      };

      mockDeliveryRepository.findById.mockResolvedValue(mockDelivery);

      await expect(service.acceptDelivery('1', 'user123')).rejects.toThrow();
    });
  });

  describe('getMyDeliveries', () => {
    it('should return deliveries for a delivery person', async () => {
      const deliveryPersonId = 'user123';
      const mockDeliveries = [
        {
          orderId: '1',
          restaurantName: 'Restaurant 1',
          pickupAddress: 'Paris',
          deliveryAddress: '123 rue de Paris',
          totalAmount: 25.99,
          status: OrderStatus.IN_PROGRESS,
          deliveryPersonId,
        },
        {
          orderId: '2',
          restaurantName: 'Restaurant 2',
          pickupAddress: 'Lyon',
          deliveryAddress: '456 rue de Lyon',
          totalAmount: 35.99,
          status: OrderStatus.ACCEPTED,
          deliveryPersonId,
        },
      ];

      mockDeliveryRepository.findMyDeliveries.mockResolvedValue(mockDeliveries);

      const result = await service.getMyDeliveries(deliveryPersonId);
      
      expect(result).toEqual(mockDeliveries);
      expect(mockDeliveryRepository.findMyDeliveries).toHaveBeenCalledWith(deliveryPersonId);
    });
  });
}); 