import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  BANNED = 'BANNED'
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Adresse email de l\'utilisateur (unique)',
    example: 'user@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur',
    example: 'Password123!'
  })
  password: string;

  @ApiProperty({
    description: 'Nom complet de l\'utilisateur',
    example: 'John Doe'
  })
  name: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nouveau nom de l\'utilisateur',
    required: false,
    example: 'John Smith'
  })
  name?: string;

  @ApiProperty({
    description: 'Nouvelle adresse email de l\'utilisateur',
    required: false,
    example: 'john.smith@example.com'
  })
  email?: string;

  @ApiProperty({
    description: 'Nouveau mot de passe de l\'utilisateur',
    required: false,
    example: 'NewPassword123!'
  })
  password?: string;
}

export class UserDto {
  @ApiProperty({
    description: 'Identifiant unique de l\'utilisateur',
    example: '1'
  })
  id: string;

  @ApiProperty({
    description: 'Adresse email de l\'utilisateur',
    example: 'user@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'Nom complet de l\'utilisateur',
    example: 'John Doe'
  })
  name: string;

  @ApiProperty({
    description: 'Date de création du compte',
    example: '2023-04-01T12:00:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour du compte',
    example: '2023-04-01T12:00:00Z'
  })
  updatedAt: Date;

  @ApiProperty({ description: 'Prénom' })
  firstName: string;

  @ApiProperty({ description: 'Nom' })
  lastName: string;

  @ApiProperty({ description: 'Date de naissance' })
  birthDate: Date;

  @ApiProperty({ description: 'Adresse' })
  address: string;

  @ApiProperty({ description: 'Numéro de téléphone', required: false })
  phoneNumber?: string | null;

  @ApiProperty({ description: 'Rôle de l\'utilisateur', enum: Role })
  role: Role;

  @ApiProperty({ description: 'Code de parrainage', required: false })
  referralCode?: string | null;

  @ApiProperty({ description: 'Statut de l\'utilisateur', enum: UserStatus })
  status: UserStatus;

  @ApiProperty({ description: 'Numéro SIRET (pour restaurateurs)', required: false })
  siret?: string | null;

  @ApiProperty({ description: 'IBAN (pour restaurateurs)', required: false })
  iban?: string | null;
} 