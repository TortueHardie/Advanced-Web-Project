import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Log } from '../../schemas/log.schema';

export class UpdateLogDto implements Partial<Log> {
  @ApiProperty({ description: 'Date et heure de l\'événement', required: false, example: '2023-01-01T00:00:00.000Z' })
  timestamp?: Date;

  @ApiProperty({ description: 'Méthode HTTP utilisée', required: false, example: 'GET' })
  method?: string;

  @ApiProperty({ description: 'Chemin de la requête', required: false, example: '/api/users' })
  path?: string;

  @ApiProperty({ description: 'Code de statut HTTP', required: false, example: 200 })
  status?: number;

  @ApiProperty({ description: 'Adresse IP du client', required: false, example: '127.0.0.1' })
  ip?: string;

  @ApiProperty({ description: 'ID de l\'utilisateur (si authentifié)', required: false, example: '5f8d0e55b54764421b71ddd7' })
  userId?: string;

  @ApiProperty({ description: 'Service qui a généré le log', required: false, example: 'user-service' })
  service?: string;
} 