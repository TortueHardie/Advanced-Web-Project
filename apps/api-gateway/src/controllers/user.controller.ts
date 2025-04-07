import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus, Headers, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@ApiTags('Utilisateurs')
@Controller('users')
export class UserController {
  private readonly userServiceUrl = process.env.USER_SERVICE_URL || 'http://user-service:3001';

  constructor(private readonly httpService: HttpService) {}

  private async forwardRequest(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', authHeader?: string, body?: any) {
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

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiBody({ description: 'Informations de l\'utilisateur à créer' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Email déjà existant' })
  async create(@Body() createUserDto: any) {
    return this.forwardRequest(`${this.userServiceUrl}/users`, 'POST', undefined, createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs récupérée' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async findAll(@Headers('authorization') authHeader: string) {
    return this.forwardRequest(`${this.userServiceUrl}/users`, 'GET', authHeader);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur récupéré' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async findOne(@Headers('authorization') authHeader: string, @Param('id') id: string) {
    return this.forwardRequest(`${this.userServiceUrl}/users/${id}`, 'GET', authHeader);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur' })
  @ApiBody({ description: 'Informations à mettre à jour' })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async update(@Headers('authorization') authHeader: string, @Param('id') id: string, @Body() updateUserDto: any) {
    return this.forwardRequest(`${this.userServiceUrl}/users/${id}`, 'PUT', authHeader, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async remove(@Headers('authorization') authHeader: string, @Param('id') id: string) {
    return this.forwardRequest(`${this.userServiceUrl}/users/${id}`, 'DELETE', authHeader);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Valider les identifiants utilisateur (utilisé par le service d\'authentification)' })
  @ApiBody({ description: 'Email et mot de passe à valider' })
  @ApiResponse({ status: 200, description: 'Identifiants validés' })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async validateUser(@Body() credentials: { email: string, password: string }) {
    return this.forwardRequest(`${this.userServiceUrl}/users/validate`, 'POST', undefined, credentials);
  }

  @Get('by-email/:email')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer un utilisateur par email' })
  @ApiParam({ name: 'email', description: 'Email de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur récupéré' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async findByEmail(@Headers('authorization') authHeader: string, @Param('email') email: string) {
    return this.forwardRequest(`${this.userServiceUrl}/users/by-email/${email}`, 'GET', authHeader);
  }
} 