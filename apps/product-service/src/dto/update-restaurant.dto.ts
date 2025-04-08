import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { RestaurantStatus } from '@prisma/client';

export class UpdateRestaurantDto {
  @ApiProperty({ description: 'Nom du restaurant', example: 'Le Petit Bistrot', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Ville du restaurant', example: 'Paris', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ description: 'Frais de livraison', example: 2.5, required: false })
  @IsNumber()
  @IsOptional()
  deliveryFees?: number;

  @ApiProperty({ description: 'Description du restaurant', example: 'Un restaurant traditionnel français', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Statut du restaurant', enum: RestaurantStatus, required: false })
  @IsEnum(RestaurantStatus)
  @IsOptional()
  status?: RestaurantStatus;
} 