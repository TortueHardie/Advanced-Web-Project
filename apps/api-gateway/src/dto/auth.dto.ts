import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsEnum, IsDateString, IsOptional } from 'class-validator';

export enum UserRole {
  CLIENT = 'CLIENT',
  LIVREUR = 'LIVREUR',
  RESTAURATEUR = 'RESTAURATEUR',
  ADMIN = 'ADMIN'
}

export class LoginDto {
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

export class RegisterDto {
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
    description: 'Rôle de l\'utilisateur',
    enum: UserRole,
    example: UserRole.CLIENT,
    default: UserRole.CLIENT
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({
    description: 'Adresse de l\'utilisateur',
    example: '123 Main St',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Date de naissance (format YYYY-MM-DD)',
    example: '1990-01-01',
    required: true
  })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    description: 'Numéro SIRET (uniquement pour les restaurateurs)',
    example: '12345678901234',
    required: false
  })
  @IsString()
  @IsOptional()
  siret?: string;

  @ApiProperty({
    description: 'IBAN (uniquement pour les restaurateurs)',
    example: 'FR7630001007941234567890185',
    required: false
  })
  @IsString()
  @IsOptional()
  iban?: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Token de rafraîchissement',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class TokenResponseDto {
  @ApiProperty({
    description: 'Token d\'accès JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken: string;

  @ApiProperty({
    description: 'Token de rafraîchissement',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Date d\'expiration du token d\'accès',
    example: '2023-04-01T12:00:00.000Z'
  })
  expiresAt: string;

  @ApiProperty({
    description: 'Informations de l\'utilisateur',
    example: {
      id: '1',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'CLIENT'
    }
  })
  user: any;
} 