import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class UserDto {
  @ApiProperty({ description: 'Identifiant unique de l\'utilisateur' })
  id: string;

  @ApiProperty({ description: 'Email de l\'utilisateur' })
  email: string;

  @ApiProperty({ description: 'Nom d\'utilisateur' })
  username: string;

  @ApiProperty({ description: 'Prénom', required: false })
  firstName?: string;

  @ApiProperty({ description: 'Nom', required: false })
  lastName?: string;

  @ApiProperty({ description: 'Rôle de l\'utilisateur', enum: Role })
  role: Role;

  @ApiProperty({ description: 'Statut actif de l\'utilisateur' })
  isActive: boolean;

  @ApiProperty({ description: 'Date de dernière connexion', required: false })
  lastLogin?: Date;

  @ApiProperty({ description: 'Date de création' })
  createdAt: Date;

  @ApiProperty({ description: 'Date de mise à jour' })
  updatedAt: Date;
} 