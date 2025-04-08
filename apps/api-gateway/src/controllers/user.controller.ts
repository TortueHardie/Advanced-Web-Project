import { Controller, Get, Post, Body, Put, Param, Delete, UnauthorizedException, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto, UpdateUserDto, UserDto, ValidateUserDto } from '../dto';
import { AccessToken } from '../decorators';

@ApiTags('Users')
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
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès', type: UserDto })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Email déjà existant' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.forwardRequest(`${this.userServiceUrl}/users`, 'POST', undefined, createUserDto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs récupérée', type: [UserDto] })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async findAll(@AccessToken() authHeader: string) {
    return this.forwardRequest(`${this.userServiceUrl}/users`, 'GET', authHeader);
  }

  @Get('by-id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiQuery({ name: 'id', description: 'ID de l\'utilisateur', required: true })
  @ApiResponse({ status: 200, description: 'Utilisateur récupéré', type: UserDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async findOne(@AccessToken() authHeader: string, @Query('id') id: string) {
    return this.forwardRequest(`${this.userServiceUrl}/users/${id}`, 'GET', authHeader);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour', type: UserDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async update(@AccessToken() authHeader: string, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.forwardRequest(`${this.userServiceUrl}/users/${id}`, 'PUT', authHeader, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async remove(@AccessToken() authHeader: string, @Param('id') id: string) {
    return this.forwardRequest(`${this.userServiceUrl}/users/${id}`, 'DELETE', authHeader);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Valider les identifiants utilisateur (utilisé par le service d\'authentification)' })
  @ApiBody({ type: ValidateUserDto })
  @ApiResponse({ status: 200, description: 'Identifiants validés', type: UserDto })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async validateUser(@Body() credentials: ValidateUserDto) {
    return this.forwardRequest(`${this.userServiceUrl}/users/validate`, 'POST', undefined, credentials);
  }

  @Get('by-email')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer un utilisateur par email' })
  @ApiQuery({ name: 'email', description: 'Email de l\'utilisateur', required: true })
  @ApiResponse({ status: 200, description: 'Utilisateur récupéré', type: UserDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async findByEmail(@AccessToken() authHeader: string, @Query('email') email: string) {
    return this.forwardRequest(`${this.userServiceUrl}/users/by-email/${email}`, 'GET', authHeader);
  }
} 