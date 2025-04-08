import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { UserRole } from './auth.dto';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED'
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'user@example.com',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur',
    example: 'Password123!',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Prénom de l\'utilisateur',
    example: 'John',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Nom de l\'utilisateur',
    example: 'Doe',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Date de naissance (format YYYY-MM-DD)',
    example: '1990-01-01',
    required: true
  })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    description: 'Adresse de l\'utilisateur',
    example: '123 Main St',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '+33612345678',
    required: false
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Rôle de l\'utilisateur',
    enum: UserRole,
    example: UserRole.CLIENT,
    default: UserRole.CLIENT
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'user@example.com',
    required: false
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur',
    example: 'NewPassword123!',
    required: false
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Prénom de l\'utilisateur',
    example: 'John',
    required: false
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'Nom de l\'utilisateur',
    example: 'Doe',
    required: false
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'Adresse de l\'utilisateur',
    example: '123 Main St',
    required: false
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '+33612345678',
    required: false
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}

export class UserDto {
  @ApiProperty({
    description: 'Identifiant unique de l\'utilisateur',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
  })
  id: string;

  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'user@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'Prénom de l\'utilisateur',
    example: 'John'
  })
  firstName: string;

  @ApiProperty({
    description: 'Nom de l\'utilisateur',
    example: 'Doe'
  })
  lastName: string;

  @ApiProperty({
    description: 'Date de naissance',
    example: '1990-01-01T00:00:00.000Z'
  })
  birthDate: Date;

  @ApiProperty({
    description: 'Adresse de l\'utilisateur',
    example: '123 Main St'
  })
  address: string;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '+33612345678',
    required: false
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Rôle de l\'utilisateur',
    enum: UserRole,
    example: UserRole.CLIENT
  })
  role: UserRole;

  @ApiProperty({
    description: 'Statut de l\'utilisateur',
    enum: UserStatus,
    example: UserStatus.ACTIVE
  })
  status: UserStatus;

  @ApiProperty({
    description: 'Date de création du compte',
    example: '2023-04-01T12:00:00.000Z'
  })
  createdAt: Date;
}

export class ValidateUserDto {
  @ApiProperty({
    description: 'Email de l\'utilisateur',
    example: 'user@example.com',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur',
    example: 'Password123!',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  password: string;
} 