import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { CreateRestaurantDto, UpdateRestaurantDto, RestaurantDto } from '../dto';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantDto> {
    return this.restaurantRepository.create(createRestaurantDto);
  }

  async findAll(): Promise<RestaurantDto[]> {
    return this.restaurantRepository.findAll();
  }

  async findOne(id: number): Promise<RestaurantDto> {
    const restaurant = await this.restaurantRepository.findOne(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<RestaurantDto> {
    await this.findOne(id);
    return this.restaurantRepository.update(id, updateRestaurantDto);
  }

  async remove(id: number): Promise<RestaurantDto> {
    await this.findOne(id);
    return this.restaurantRepository.remove(id);
  }

  async findMenus(restaurantId: number) {
    await this.findOne(restaurantId);
    return this.restaurantRepository.findMenus(restaurantId);
  }
} 