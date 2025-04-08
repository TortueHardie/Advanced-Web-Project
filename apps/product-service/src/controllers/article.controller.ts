import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { CreateArticleDto, UpdateArticleDto, ArticleDto } from '../dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel article' })
  @ApiBody({ type: CreateArticleDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Article créé avec succès',
    type: ArticleDto 
  })
  async create(@Body() createArticleDto: CreateArticleDto): Promise<ArticleDto> {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les articles d\'un menu' })
  @ApiQuery({ 
    name: 'menuId', 
    description: 'ID du menu',
    type: String,
    required: true
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des articles récupérée avec succès',
    type: [ArticleDto]
  })
  async findAll(@Query('menuId', ParseUUIDPipe) menuId: string): Promise<ArticleDto[]> {
    return this.articleService.findByMenu(menuId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un article par son ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'article' })
  @ApiResponse({ 
    status: 200, 
    description: 'Article trouvé',
    type: ArticleDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Article non trouvé'
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ArticleDto> {
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un article' })
  @ApiParam({ name: 'id', description: 'ID de l\'article' })
  @ApiBody({ type: UpdateArticleDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Article mis à jour avec succès',
    type: ArticleDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Article non trouvé'
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleDto> {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un article' })
  @ApiParam({ name: 'id', description: 'ID de l\'article' })
  @ApiResponse({ 
    status: 200, 
    description: 'Article supprimé avec succès',
    type: ArticleDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Article non trouvé'
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ArticleDto> {
    return this.articleService.remove(id);
  }

  @Patch(':id/stock')
  @ApiOperation({ summary: 'Mettre à jour le stock d\'un article' })
  @ApiParam({ name: 'id', description: 'ID de l\'article' })
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        stock: {
          type: 'number',
          description: 'Nouvelle valeur du stock',
          example: 100
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Stock de l\'article mis à jour avec succès',
    type: ArticleDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Article non trouvé'
  })
  async updateStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('stock') stock: number,
  ): Promise<ArticleDto> {
    return this.articleService.updateStock(id, stock);
  }

  @Patch(':id/availability')
  @ApiOperation({ summary: 'Mettre à jour la disponibilité d\'un article' })
  @ApiParam({ name: 'id', description: 'ID de l\'article' })
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
    description: 'Disponibilité de l\'article mise à jour avec succès',
    type: ArticleDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Article non trouvé'
  })
  async updateAvailability(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('isAvailable') isAvailable: boolean,
  ): Promise<ArticleDto> {
    return this.articleService.updateAvailability(id, isAvailable);
  }
} 