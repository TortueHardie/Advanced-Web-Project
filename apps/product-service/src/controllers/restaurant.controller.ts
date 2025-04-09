import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RestaurantService } from '../services/restaurant.service';
import { CreateRestaurantDto, UpdateRestaurantDto, RestaurantDto, MenuDto } from '../dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

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
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RestaurantDto> {
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
    @Param('id', ParseIntPipe) id: number,
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
  async remove(@Param('id', ParseIntPipe) id: number): Promise<RestaurantDto> {
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
  async findMenus(@Param('id', ParseIntPipe) id: number): Promise<MenuDto[]> {
    return this.restaurantService.findMenus(id);
  }
} 