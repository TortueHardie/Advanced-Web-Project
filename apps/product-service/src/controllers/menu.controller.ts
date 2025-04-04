import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { MenuService } from '../services/menu.service';
import { CreateMenuDto, UpdateMenuDto, MenuDto } from '../dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Menus')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau menu' })
  @ApiBody({ type: CreateMenuDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Menu créé avec succès',
    type: MenuDto 
  })
  async create(@Body() createMenuDto: CreateMenuDto): Promise<MenuDto> {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les menus d\'un restaurant' })
  @ApiQuery({ 
    name: 'restaurantId', 
    description: 'ID du restaurant',
    type: Number 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des menus récupérée avec succès',
    type: [MenuDto]
  })
  async findAll(@Query('restaurantId', ParseIntPipe) restaurantId: number): Promise<MenuDto[]> {
    return this.menuService.findAll(restaurantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un menu par son ID' })
  @ApiParam({ name: 'id', description: 'ID du menu' })
  @ApiResponse({ 
    status: 200, 
    description: 'Menu trouvé',
    type: MenuDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Menu non trouvé'
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<MenuDto> {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un menu' })
  @ApiParam({ name: 'id', description: 'ID du menu' })
  @ApiBody({ type: UpdateMenuDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Menu mis à jour avec succès',
    type: MenuDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Menu non trouvé'
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<MenuDto> {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un menu' })
  @ApiParam({ name: 'id', description: 'ID du menu' })
  @ApiResponse({ 
    status: 200, 
    description: 'Menu supprimé avec succès',
    type: MenuDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Menu non trouvé'
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<MenuDto> {
    return this.menuService.remove(id);
  }

  @Patch(':id/availability')
  @ApiOperation({ summary: 'Mettre à jour la disponibilité d\'un menu' })
  @ApiParam({ name: 'id', description: 'ID du menu' })
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        isAvailable: {
          type: 'boolean',
          description: 'Nouvelle valeur de disponibilité',
          example: true
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Disponibilité du menu mise à jour avec succès',
    type: MenuDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Menu non trouvé'
  })
  async updateAvailability(
    @Param('id', ParseIntPipe) id: number,
    @Body('isAvailable') isAvailable: boolean,
  ): Promise<MenuDto> {
    return this.menuService.updateAvailability(id, isAvailable);
  }
} 