import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { CreateRestaurantDto, UpdateRestaurantDto, RestaurantDto, MenuDto } from '../dto';
import {
  RestaurantNotFoundException,
  RestaurantAlreadyExistsException,
  InvalidRestaurantDataException,
  RestaurantOperationFailedException
} from '../exceptions/restaurant.exception';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantDto> {
    try {
      // Vérifier si un restaurant avec le même nom existe déjà
      const existingRestaurant = await this.restaurantRepository.findByName(createRestaurantDto.name);
      if (existingRestaurant) {
        throw new RestaurantAlreadyExistsException();
      }

      const restaurant = await this.restaurantRepository.create(createRestaurantDto);
      return this.mapToDto(restaurant);
    } catch (error) {
      if (error instanceof RestaurantAlreadyExistsException) {
        throw error;
      }
      throw new RestaurantOperationFailedException('Création du restaurant échouée');
    }
  }

  async findAll(): Promise<RestaurantDto[]> {
    try {
      const restaurants = await this.restaurantRepository.findAll();
      return restaurants.map(restaurant => this.mapToDto(restaurant));
    } catch (error) {
      throw new RestaurantOperationFailedException('Récupération des restaurants échouée');
    }
  }

  async findOne(id: string): Promise<RestaurantDto> {
    try {
      const restaurant = await this.restaurantRepository.findOne(id);
      if (!restaurant) {
        throw new RestaurantNotFoundException();
      }
      return this.mapToDto(restaurant);
    } catch (error) {
      if (error instanceof RestaurantNotFoundException) {
        throw error;
      }
      throw new RestaurantOperationFailedException('Récupération du restaurant échouée');
    }
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<RestaurantDto> {
    try {
      // Vérifier si le restaurant existe
      await this.findOne(id);

      // Si le nom est modifié, vérifier qu'il n'existe pas déjà
      if (updateRestaurantDto.name) {
        const existingRestaurant = await this.restaurantRepository.findByName(updateRestaurantDto.name);
        if (existingRestaurant && existingRestaurant.id !== id) {
          throw new RestaurantAlreadyExistsException();
        }
      }

      const restaurant = await this.restaurantRepository.update(id, updateRestaurantDto);
      return this.mapToDto(restaurant);
    } catch (error) {
      if (error instanceof RestaurantNotFoundException || 
          error instanceof RestaurantAlreadyExistsException) {
        throw error;
      }
      throw new RestaurantOperationFailedException('Mise à jour du restaurant échouée');
    }
  }

  async remove(id: string): Promise<RestaurantDto> {
    try {
      // Vérifier si le restaurant existe
      await this.findOne(id);
      const restaurant = await this.restaurantRepository.remove(id);
      return this.mapToDto(restaurant);
    } catch (error) {
      if (error instanceof RestaurantNotFoundException) {
        throw error;
      }
      throw new RestaurantOperationFailedException('Suppression du restaurant échouée');
    }
  }

  async findMenus(restaurantId: string): Promise<MenuDto[]> {
    try {
      // Vérifier si le restaurant existe
      await this.findOne(restaurantId);
      const menus = await this.restaurantRepository.findMenus(restaurantId);
      return menus.map(menu => ({
        ...menu,
        isAvailable: true // Valeur par défaut si non définie
      }));
    } catch (error) {
      if (error instanceof RestaurantNotFoundException) {
        throw error;
      }
      throw new RestaurantOperationFailedException('Récupération des menus échouée');
    }
  }

  private mapToDto(restaurant: any): RestaurantDto {
    return {
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      city: restaurant.city,
      deliveryFees: restaurant.deliveryFees,
      status: restaurant.status as any,
      ownerId: restaurant.ownerId,
      menus: restaurant.menus,
      articles: restaurant.articles
    };
  }
} 