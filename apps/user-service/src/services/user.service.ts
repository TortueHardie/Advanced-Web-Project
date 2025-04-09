import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private excludePassword(user: any): UserDto {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    // Vérifier si l'email existe déjà
    const emailExists = await this.userRepository.findByEmail(createUserDto.email);
    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    // Vérifier si le nom d'utilisateur existe déjà
    const usernameExists = await this.userRepository.findByUsername(createUserDto.username);
    if (usernameExists) {
      throw new ConflictException('Username already exists');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Créer l'utilisateur avec le mot de passe hashé
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.excludePassword(user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => this.excludePassword(user));
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.excludePassword(user);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return this.excludePassword(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    // Vérifier si l'utilisateur existe
    await this.findOne(id);

    let updatedFields = { ...updateUserDto };

    // Si l'email est mis à jour, vérifier s'il existe déjà
    if (updateUserDto.email) {
      const emailExists = await this.userRepository.findByEmail(updateUserDto.email);
      if (emailExists && emailExists.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    // Si le nom d'utilisateur est mis à jour, vérifier s'il existe déjà
    if (updateUserDto.username) {
      const usernameExists = await this.userRepository.findByUsername(updateUserDto.username);
      if (usernameExists && usernameExists.id !== id) {
        throw new ConflictException('Username already exists');
      }
    }

    // Hasher le mot de passe si présent
    if (updateUserDto.password) {
      updatedFields.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.userRepository.update(id, updatedFields);
    return this.excludePassword(updatedUser);
  }

  async remove(id: string): Promise<UserDto> {
    // Vérifier si l'utilisateur existe
    await this.findOne(id);

    const deletedUser = await this.userRepository.remove(id);
    return this.excludePassword(deletedUser);
  }

  async updateLastLogin(id: string): Promise<UserDto> {
    const user = await this.userRepository.updateLastLogin(id);
    return this.excludePassword(user);
  }
} 