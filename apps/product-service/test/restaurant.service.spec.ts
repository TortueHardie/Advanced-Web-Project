import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from '../src/services/restaurant.service';
import { RestaurantRepository } from '../src/repositories/restaurant.repository';
import { RestaurantNotFoundException, RestaurantAlreadyExistsException } from '../src/exceptions/restaurant.exception';
import { PrismaService } from '@advanced-web/prisma';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let repository: RestaurantRepository;

  const mockRestaurantRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByName: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findMenus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: RestaurantRepository,
          useValue: mockRestaurantRepository,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    repository = module.get<RestaurantRepository>(RestaurantRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of restaurants', async () => {
      const mockRestaurants = [
        {
          id: '1',
          name: 'Restaurant 1',
          description: 'Description 1',
          city: 'Paris',
          deliveryFees: 2.99,
          status: 'ACTIVE',
          ownerId: 'owner1',
        },
        {
          id: '2',
          name: 'Restaurant 2',
          description: 'Description 2',
          city: 'Lyon',
          deliveryFees: 3.99,
          status: 'ACTIVE',
          ownerId: 'owner2',
        },
      ];

      mockRestaurantRepository.findAll.mockResolvedValue(mockRestaurants);

      const result = await service.findAll();
      
      expect(result).toEqual(mockRestaurants);
      expect(mockRestaurantRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a restaurant if found', async () => {
      const mockRestaurant = {
        id: '1',
        name: 'Restaurant 1',
        description: 'Description 1',
        city: 'Paris',
        deliveryFees: 2.99,
        status: 'ACTIVE',
        ownerId: 'owner1',
      };

      mockRestaurantRepository.findOne.mockResolvedValue(mockRestaurant);

      const result = await service.findOne('1');
      
      expect(result).toEqual(mockRestaurant);
      expect(mockRestaurantRepository.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw a RestaurantNotFoundException if restaurant is not found', async () => {
      mockRestaurantRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(RestaurantNotFoundException);
      expect(mockRestaurantRepository.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new restaurant', async () => {
      const createRestaurantDto = {
        name: 'New Restaurant',
        description: 'New Description',
        city: 'Paris',
        deliveryFees: 2.99,
        status: 'ACTIVE',
        ownerId: 'owner1',
      };

      const mockRestaurant = {
        id: '1',
        ...createRestaurantDto,
      };

      mockRestaurantRepository.findByName.mockResolvedValue(null);
      mockRestaurantRepository.create.mockResolvedValue(mockRestaurant);

      const result = await service.create(createRestaurantDto);
      
      expect(result).toEqual(mockRestaurant);
      expect(mockRestaurantRepository.findByName).toHaveBeenCalledWith(createRestaurantDto.name);
      expect(mockRestaurantRepository.create).toHaveBeenCalledWith(createRestaurantDto);
    });

    it('should throw a RestaurantAlreadyExistsException if restaurant name already exists', async () => {
      const createRestaurantDto = {
        name: 'Existing Restaurant',
        description: 'New Description',
        city: 'Paris',
        deliveryFees: 2.99,
        status: 'ACTIVE',
        ownerId: 'owner1',
      };

      const existingRestaurant = {
        id: '1',
        ...createRestaurantDto,
      };

      mockRestaurantRepository.findByName.mockResolvedValue(existingRestaurant);

      await expect(service.create(createRestaurantDto)).rejects.toThrow(RestaurantAlreadyExistsException);
      expect(mockRestaurantRepository.findByName).toHaveBeenCalledWith(createRestaurantDto.name);
      expect(mockRestaurantRepository.create).not.toHaveBeenCalled();
    });
  });
}); 