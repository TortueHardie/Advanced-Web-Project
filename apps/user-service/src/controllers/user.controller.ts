import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès', type: UserDto })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Email déjà existant' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Valider les identifiants d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Identifiants valides', schema: { 
    properties: { 
      valid: { type: 'boolean' },
      userId: { type: 'string' }
    } 
  }})
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async validateUser(@Body() credentials: { email: string, password: string }): Promise<{ valid: boolean, userId?: string }> {
    try {
      const validationResult = await this.userService.validateCredentials(credentials.email, credentials.password);
      return { valid: true, userId: validationResult.id.toString() };
    } catch (error) {
      return { valid: false };
    }
  }

  @Get('by-email/:email')
  @ApiOperation({ summary: 'Récupérer un utilisateur par email' })
  @ApiParam({ name: 'email', description: 'Email de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé', type: UserDto })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async findByEmail(@Param('email') email: string): Promise<UserDto> {
    return this.userService.findByEmail(email);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs', type: [UserDto] })
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé', type: UserDto })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour', type: UserDto })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: 409, description: 'Email déjà existant' })
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé', type: UserDto })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: string): Promise<UserDto> {
    return this.userService.remove(id);
  }

  // Méthodes pour communication entre microservices

  @MessagePattern({ cmd: 'find_user_by_id' })
  async findUserById(id: string): Promise<UserDto | null> {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return null;
      }
      throw error;
    }
  }

  @MessagePattern({ cmd: 'find_user_by_email' })
  async findUserByEmail(email: string): Promise<UserDto | null> {
    try {
      return await this.userService.findByEmail(email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return null;
      }
      throw error;
    }
  }

  @MessagePattern({ cmd: 'find_all_users' })
  async findAllUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'update_user' })
  async updateUser(data: { id: string, [key: string]: any }): Promise<UserDto> {
    const { id, ...updateUserDto } = data;
    return this.userService.update(id, updateUserDto);
  }

  @MessagePattern({ cmd: 'remove_user' })
  async removeUser(id: string): Promise<UserDto> {
    return this.userService.remove(id);
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }
} 