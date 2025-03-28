import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'Email de l\'utilisateur', example: 'user@example.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Nom d\'utilisateur', example: 'john_doe', required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: 'Mot de passe', example: 'password123', minLength: 8, required: false })
  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @ApiProperty({ description: 'Prénom', example: 'John', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ description: 'Nom', example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ description: 'Statut actif', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 