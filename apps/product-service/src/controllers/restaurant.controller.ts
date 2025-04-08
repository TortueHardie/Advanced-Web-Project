import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { RestaurantService } from '../services/restaurant.service';
import { CreateRestaurantDto, UpdateRestaurantDto, RestaurantDto, MenuDto } from '../dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau restaurant' })
  @ApiBody({ type: CreateRestaurantDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Restaurant créé avec succès',
    type: RestaurantDto 
  })
  async create(@Body() createRestaurantDto: CreateRestaurantDto): Promise<RestaurantDto> {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les restaurants' })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des restaurants récupérée avec succès',
    type: [RestaurantDto]
  })
  async findAll(): Promise<RestaurantDto[]> {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un restaurant par son ID' })
  @ApiParam({ name: 'id', description: 'ID du restaurant' })
  @ApiResponse({ 
    status: 200, 
    description: 'Restaurant trouvé',
    type: RestaurantDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Restaurant non trouvé'
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<RestaurantDto> {
    return this.restaurantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un restaurant' })
  @ApiParam({ name: 'id', description: 'ID du restaurant' })
  @ApiBody({ type: UpdateRestaurantDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Restaurant mis à jour avec succès',
    type: RestaurantDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Restaurant non trouvé'
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<RestaurantDto> {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un restaurant' })
  @ApiParam({ name: 'id', description: 'ID du restaurant' })
  @ApiResponse({ 
    status: 200, 
    description: 'Restaurant supprimé avec succès',
    type: RestaurantDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Restaurant non trouvé'
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<RestaurantDto> {
    return this.restaurantService.remove(id);
  }

  @Get(':id/menus')
  @ApiOperation({ summary: 'Récupérer les menus d\'un restaurant' })
  @ApiParam({ name: 'id', description: 'ID du restaurant' })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des menus récupérée avec succès',
    type: [MenuDto]
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Restaurant non trouvé'
  })
  async findMenus(@Param('id', ParseUUIDPipe) id: string): Promise<MenuDto[]> {
    return this.restaurantService.findMenus(id);
  }

  // Méthodes pour communication entre microservices
  @MessagePattern({ cmd: 'find_restaurant_by_id' })
  async findRestaurantById(id: string): Promise<RestaurantDto | null> {
    try {
      return await this.restaurantService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return null;
      }
      throw error;
    }
  }

  @MessagePattern({ cmd: 'find_all_restaurants' })
  async findAllRestaurants(): Promise<RestaurantDto[]> {
    return this.restaurantService.findAll();
  }

  @MessagePattern({ cmd: 'update_restaurant' })
  async updateRestaurant(data: { id: string, [key: string]: any }): Promise<RestaurantDto> {
    const { id, ...updateRestaurantDto } = data;
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @MessagePattern({ cmd: 'remove_restaurant' })
  async removeRestaurant(id: string): Promise<RestaurantDto> {
    return this.restaurantService.remove(id);
  }

  @MessagePattern({ cmd: 'create_restaurant' })
  async createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantDto> {
    return this.restaurantService.create(createRestaurantDto);
  }

  @MessagePattern({ cmd: 'find_restaurant_menus' })
  async findRestaurantMenus(id: string): Promise<MenuDto[]> {
    return this.restaurantService.findMenus(id);
  }
} 