import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private excludePassword(user: User): UserDto {
    const { password, ...userWithoutPassword } = user;
    const userDto: UserDto = {
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
      firstName: userWithoutPassword.firstName,
      lastName: userWithoutPassword.lastName,
      birthDate: userWithoutPassword.birthDate,
      address: userWithoutPassword.address,
      phoneNumber: userWithoutPassword.phoneNumber || undefined,
      role: userWithoutPassword.role,
      referralCode: userWithoutPassword.referralCode || undefined,
      status: userWithoutPassword.status,
      siret: userWithoutPassword.siret || undefined,
      iban: userWithoutPassword.iban || undefined,
      createdAt: userWithoutPassword.createdAt,
    };
    return userDto;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    // Vérifier si l'email existe déjà
    const emailExists = await this.userRepository.findByEmail(createUserDto.email);
    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Créer l'utilisateur avec le mot de passe hashé et les champs requis
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      birthDate: new Date(createUserDto.birthDate),
      role: createUserDto.role,
      address: createUserDto.address,
    });

    return this.excludePassword(user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => this.excludePassword(user));
  }

  async findOne(id: number): Promise<UserDto> {
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
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

    // Hasher le mot de passe si présent
    if (updateUserDto.password) {
      updatedFields.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.userRepository.update(id, updatedFields);
    return this.excludePassword(updatedUser);
  }

  async remove(id: number): Promise<UserDto> {
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