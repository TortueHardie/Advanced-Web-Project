import { ApiProperty } from '@nestjs/swagger';
import { Role, UserStatus } from '@prisma/client';

export class UserDto {
  @ApiProperty({ description: 'ID de l\'utilisateur' })
  id: number;

  @ApiProperty({ description: 'Email de l\'utilisateur' })
  email: string;

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

  @ApiProperty({ description: 'Date de création' })
  createdAt: Date;
} 