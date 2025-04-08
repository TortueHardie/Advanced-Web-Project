import { Injectable, NotFoundException, ConflictException, UnauthorizedException, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto, UserStatus } from '../dto';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  
  constructor(private readonly userRepository: UserRepository) {}

  private excludePassword(user: User): UserDto {
    const { password, ...userWithoutPassword } = user;
    
    // Casting explicite pour éviter les erreurs TypeScript
    const userDto: UserDto = {
      id: userWithoutPassword.id.toString(),
      email: userWithoutPassword.email,
      name: `${userWithoutPassword.firstName || ''} ${userWithoutPassword.lastName || ''}`.trim() || 'Anonymous',
      firstName: userWithoutPassword.firstName || '',
      lastName: userWithoutPassword.lastName || '',
      role: userWithoutPassword.role,
      status: (userWithoutPassword as any).isActive ? UserStatus.ACTIVE : UserStatus.INACTIVE,
      createdAt: userWithoutPassword.createdAt,
      // Valeurs par défaut pour les autres champs
      updatedAt: new Date(),
      birthDate: new Date(),
      address: '',
      phoneNumber: null,
      referralCode: null,
      siret: null,
      iban: null
    } as UserDto;
    
    return userDto;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      // Vérifier si l'email existe déjà
      const emailExists = await this.userRepository.findByEmail(createUserDto.email);
      if (emailExists) {
        throw new ConflictException('Email already exists');
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Utiliser un cast explicite pour éviter les erreurs TypeScript
      const userData = {
        email: createUserDto.email,
        password: hashedPassword,
        firstName: (createUserDto as any).firstName,
        lastName: (createUserDto as any).lastName,
        role: (createUserDto as any).role,
        address: (createUserDto as any).address,
      };

      // Si birthDate est présent, le convertir en date
      if ((createUserDto as any).birthDate) {
        userData['birthDate'] = new Date((createUserDto as any).birthDate);
      }

      // Créer l'utilisateur
      const user = await this.userRepository.create(userData as any);

      return this.excludePassword(user);
    } catch (error) {
      this.logger.error(`Erreur lors de la création d'un utilisateur: ${error.message}`, error.stack);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException("Erreur lors de la création de l'utilisateur");
    }
  }

  async findAll(): Promise<UserDto[]> {
    try {
      const users = await this.userRepository.findAll();
      return users.map(user => this.excludePassword(user));
    } catch (error) {
      this.logger.error(`Erreur lors de la récupération de tous les utilisateurs: ${error.message}`, error.stack);
      throw new InternalServerErrorException("Erreur lors de la récupération des utilisateurs");
    }
  }

  async findOne(id: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return this.excludePassword(user);
    } catch (error) {
      this.logger.error(`Erreur lors de la recherche d'un utilisateur par ID ${id}: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Erreur lors de la recherche de l\'utilisateur avec l\'ID ${id}`);
    }
  }

  async findByEmail(email: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return this.excludePassword(user);
    } catch (error) {
      this.logger.error(`Erreur lors de la recherche d'un utilisateur par email ${email}: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Erreur lors de la recherche de l\'utilisateur avec l\'email ${email}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      // Vérifier si l'utilisateur existe
      await this.findOne(id);

      let updatedFields = { ...updateUserDto };

      // Si l'email est mis à jour, vérifier s'il existe déjà
      if (updateUserDto.email) {
        const emailExists = await this.userRepository.findByEmail(updateUserDto.email);
        // Comparer en convertissant explicitement en nombre
        if (emailExists && emailExists.id !== id) {
          throw new ConflictException('Email already exists');
        }
      }

      // Hasher le mot de passe si présent
      if (updateUserDto.password) {
        updatedFields.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      const updatedUser = await this.userRepository.update(id, updatedFields);
      return this.excludePassword(updatedUser);
    } catch (error) {
      this.logger.error(`Erreur lors de la mise à jour de l'utilisateur ${id}: ${error.message}`, error.stack);
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(`Erreur lors de la mise à jour de l\'utilisateur avec l\'ID ${id}`);
    }
  }

  async remove(id: string): Promise<UserDto> {
    try {
      // Vérifier si l'utilisateur existe
      await this.findOne(id);

      const deletedUser = await this.userRepository.remove(id);
      return this.excludePassword(deletedUser);
    } catch (error) {
      this.logger.error(`Erreur lors de la suppression de l'utilisateur ${id}: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Erreur lors de la suppression de l\'utilisateur avec l\'ID ${id}`);
    }
  }

  async validateCredentials(email: string, password: string): Promise<UserDto> {
    try {
      // Récupérer l'utilisateur complet avec le mot de passe
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Mettre à jour la date de dernière connexion si nécessaire
      // Désactivé pour éviter les erreurs liées au schéma
      // await this.updateLastLogin(user.id.toString());

      return this.excludePassword(user);
    } catch (error) {
      this.logger.error(`Erreur lors de la validation des identifiants pour ${email}: ${error.message}`, error.stack);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException("Erreur lors de la validation des identifiants");
    }
  }

  async updateLastLogin(id: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.updateLastLogin(id);
      return this.excludePassword(user);
    } catch (error) {
      this.logger.error(`Erreur lors de la mise à jour de la dernière connexion pour l'utilisateur ${id}: ${error.message}`, error.stack);
      try {
        // Récupérer l'utilisateur sans mettre à jour la dernière connexion
        const user = await this.userRepository.findOne(id);
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return this.excludePassword(user);
      } catch (innerError) {
        this.logger.error(`Erreur supplémentaire lors de la récupération de l'utilisateur ${id}: ${innerError.message}`, innerError.stack);
        if (innerError instanceof NotFoundException) {
          throw innerError;
        }
        throw new InternalServerErrorException(`Erreur lors de la mise à jour de la dernière connexion pour l\'utilisateur avec l\'ID ${id}`);
      }
    }
  }
} 