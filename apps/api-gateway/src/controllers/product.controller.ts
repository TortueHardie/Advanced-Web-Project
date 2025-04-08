import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UnauthorizedException, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { 
  CreateRestaurantDto, UpdateRestaurantDto, RestaurantDto,
  CreateMenuDto, UpdateMenuDto, MenuDto,
  CreateArticleDto, UpdateArticleDto, ArticleDto
} from '../dto';
import { AccessToken } from '../decorators';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  private readonly productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://product-service:3002';

  constructor(private readonly httpService: HttpService) {}

  private async forwardRequest(url: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', authHeader?: string, body?: any) {
    const headers: Record<string, string> = {};
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    try {
      let response;
      switch (method) {
        case 'GET':
          response = await firstValueFrom(
            this.httpService.get(url, { headers })
          );
          break;
        case 'POST':
          response = await firstValueFrom(
            this.httpService.post(url, body, { headers })
          );
          break;
        case 'PUT':
          response = await firstValueFrom(
            this.httpService.put(url, body, { headers })
          );
          break;
        case 'PATCH':
          response = await firstValueFrom(
            this.httpService.patch(url, body, { headers })
          );
          break;
        case 'DELETE':
          response = await firstValueFrom(
            this.httpService.delete(url, { headers })
          );
          break;
      }
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new UnauthorizedException(error.response?.data?.message || 'Non autorisé');
      }
      throw error;
    }
  }

  // Restaurant endpoints
  @Get('restaurants')
  @ApiOperation({ summary: 'Récupérer tous les restaurants' })
  @ApiResponse({ status: 200, description: 'Liste des restaurants récupérée', type: [RestaurantDto] })
  async findAllRestaurants(): Promise<RestaurantDto[]> {
    return this.forwardRequest(`${this.productServiceUrl}/restaurants`, 'GET');
  }

  @Get('restaurants/:id')
  @ApiOperation({ summary: 'Récupérer un restaurant par ID' })
  @ApiParam({ name: 'id', description: 'ID du restaurant' })
  @ApiResponse({ status: 200, description: 'Restaurant récupéré', type: RestaurantDto })
  @ApiResponse({ status: 404, description: 'Restaurant non trouvé' })
  async findOneRestaurant(@Param('id', ParseUUIDPipe) id: string): Promise<RestaurantDto> {
    return this.forwardRequest(`${this.productServiceUrl}/restaurants/${id}`, 'GET');
  }

  @Post('restaurants')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Créer un nouveau restaurant' })
  @ApiBody({ type: CreateRestaurantDto })
  @ApiResponse({ status: 201, description: 'Restaurant créé avec succès', type: RestaurantDto })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async createRestaurant(@AccessToken() authHeader: string, @Body() createRestaurantDto: CreateRestaurantDto): Promise<RestaurantDto> {
    return this.forwardRequest(`${this.productServiceUrl}/restaurants`, 'POST', authHeader, createRestaurantDto);
  }

  @Patch('restaurants/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Mettre à jour un restaurant' })
  @ApiParam({ name: 'id', description: 'ID du restaurant' })
  @ApiBody({ type: UpdateRestaurantDto })
  @ApiResponse({ status: 200, description: 'Restaurant mis à jour', type: RestaurantDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Restaurant non trouvé' })
  async updateRestaurant(
    @AccessToken() authHeader: string, 
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateRestaurantDto: UpdateRestaurantDto
  ): Promise<RestaurantDto> {
    return this.forwardRequest(`${this.productServiceUrl}/restaurants/${id}`, 'PATCH', authHeader, updateRestaurantDto);
  }

  @Delete('restaurants/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Supprimer un restaurant' })
  @ApiParam({ name: 'id', description: 'ID du restaurant' })
  @ApiResponse({ status: 200, description: 'Restaurant supprimé', type: RestaurantDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Restaurant non trouvé' })
  async removeRestaurant(@AccessToken() authHeader: string, @Param('id', ParseUUIDPipe) id: string): Promise<RestaurantDto> {
    return this.forwardRequest(`${this.productServiceUrl}/restaurants/${id}`, 'DELETE', authHeader);
  }

  @Get('restaurants/:id/menus')
  @ApiOperation({ summary: 'Récupérer les menus d\'un restaurant' })
  @ApiParam({ name: 'id', description: 'ID du restaurant' })
  @ApiResponse({ status: 200, description: 'Liste des menus récupérée', type: [MenuDto] })
  @ApiResponse({ status: 404, description: 'Restaurant non trouvé' })
  async findMenus(@Param('id', ParseUUIDPipe) id: string): Promise<MenuDto[]> {
    return this.forwardRequest(`${this.productServiceUrl}/restaurants/${id}/menus`, 'GET');
  }

  // Menu endpoints
  @Get('menus')
  @ApiOperation({ summary: 'Récupérer tous les menus' })
  @ApiResponse({ status: 200, description: 'Liste des menus récupérée', type: [MenuDto] })
  async findAllMenus(): Promise<MenuDto[]> {
    return this.forwardRequest(`${this.productServiceUrl}/menus`, 'GET');
  }

  @Get('menus/:id')
  @ApiOperation({ summary: 'Récupérer un menu par ID' })
  @ApiParam({ name: 'id', description: 'ID du menu' })
  @ApiResponse({ status: 200, description: 'Menu récupéré', type: MenuDto })
  @ApiResponse({ status: 404, description: 'Menu non trouvé' })
  async findOneMenu(@Param('id', ParseUUIDPipe) id: string): Promise<MenuDto> {
    return this.forwardRequest(`${this.productServiceUrl}/menus/${id}`, 'GET');
  }

  @Post('menus')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Créer un nouveau menu' })
  @ApiBody({ type: CreateMenuDto })
  @ApiResponse({ status: 201, description: 'Menu créé avec succès', type: MenuDto })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async createMenu(@AccessToken() authHeader: string, @Body() createMenuDto: CreateMenuDto): Promise<MenuDto> {
    return this.forwardRequest(`${this.productServiceUrl}/menus`, 'POST', authHeader, createMenuDto);
  }

  @Patch('menus/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Mettre à jour un menu' })
  @ApiParam({ name: 'id', description: 'ID du menu' })
  @ApiBody({ type: UpdateMenuDto })
  @ApiResponse({ status: 200, description: 'Menu mis à jour', type: MenuDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Menu non trouvé' })
  async updateMenu(
    @AccessToken() authHeader: string, 
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateMenuDto: UpdateMenuDto
  ): Promise<MenuDto> {
    return this.forwardRequest(`${this.productServiceUrl}/menus/${id}`, 'PATCH', authHeader, updateMenuDto);
  }

  @Delete('menus/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Supprimer un menu' })
  @ApiParam({ name: 'id', description: 'ID du menu' })
  @ApiResponse({ status: 200, description: 'Menu supprimé', type: MenuDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Menu non trouvé' })
  async removeMenu(@AccessToken() authHeader: string, @Param('id', ParseUUIDPipe) id: string): Promise<MenuDto> {
    return this.forwardRequest(`${this.productServiceUrl}/menus/${id}`, 'DELETE', authHeader);
  }

  // Article endpoints
  @Get('articles')
  @ApiOperation({ summary: 'Récupérer tous les articles' })
  @ApiResponse({ status: 200, description: 'Liste des articles récupérée', type: [ArticleDto] })
  async findAllArticles(): Promise<ArticleDto[]> {
    return this.forwardRequest(`${this.productServiceUrl}/articles`, 'GET');
  }

  @Get('articles/:id')
  @ApiOperation({ summary: 'Récupérer un article par ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'article' })
  @ApiResponse({ status: 200, description: 'Article récupéré', type: ArticleDto })
  @ApiResponse({ status: 404, description: 'Article non trouvé' })
  async findOneArticle(@Param('id', ParseUUIDPipe) id: string): Promise<ArticleDto> {
    return this.forwardRequest(`${this.productServiceUrl}/articles/${id}`, 'GET');
  }

  @Post('articles')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Créer un nouvel article' })
  @ApiBody({ type: CreateArticleDto })
  @ApiResponse({ status: 201, description: 'Article créé avec succès', type: ArticleDto })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async createArticle(@AccessToken() authHeader: string, @Body() createArticleDto: CreateArticleDto): Promise<ArticleDto> {
    return this.forwardRequest(`${this.productServiceUrl}/articles`, 'POST', authHeader, createArticleDto);
  }

  @Patch('articles/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Mettre à jour un article' })
  @ApiParam({ name: 'id', description: 'ID de l\'article' })
  @ApiBody({ type: UpdateArticleDto })
  @ApiResponse({ status: 200, description: 'Article mis à jour', type: ArticleDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Article non trouvé' })
  async updateArticle(
    @AccessToken() authHeader: string, 
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateArticleDto: UpdateArticleDto
  ): Promise<ArticleDto> {
    return this.forwardRequest(`${this.productServiceUrl}/articles/${id}`, 'PATCH', authHeader, updateArticleDto);
  }

  @Delete('articles/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Supprimer un article' })
  @ApiParam({ name: 'id', description: 'ID de l\'article' })
  @ApiResponse({ status: 200, description: 'Article supprimé', type: ArticleDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Article non trouvé' })
  async removeArticle(@AccessToken() authHeader: string, @Param('id', ParseUUIDPipe) id: string): Promise<ArticleDto> {
    return this.forwardRequest(`${this.productServiceUrl}/articles/${id}`, 'DELETE', authHeader);
  }
} 