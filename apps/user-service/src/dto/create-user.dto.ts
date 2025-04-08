import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsEnum, IsDateString } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ description: 'Email de l\'utilisateur', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Mot de passe', example: 'password123', minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: 'Prénom', example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Nom', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Date de naissance', example: '1990-01-01' })
  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @ApiProperty({ description: 'Adresse', example: '123 rue Example' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Numéro de téléphone', example: '+33123456789', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ description: 'Rôle de l\'utilisateur', enum: Role })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @ApiProperty({ description: 'Code de parrainage', required: false })
  @IsString()
  @IsOptional()
  referralCode?: string;

  @ApiProperty({ description: 'Numéro SIRET (pour restaurateurs)', required: false })
  @IsString()
  @IsOptional()
  siret?: string;

  @ApiProperty({ description: 'IBAN (pour restaurateurs)', required: false })
  @IsString()
  @IsOptional()
  iban?: string;
} 