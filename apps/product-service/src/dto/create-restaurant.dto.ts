import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({ description: 'Nom du restaurant', example: 'Le Petit Bistrot' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Ville du restaurant', example: 'Paris' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'Frais de livraison', example: 2.5 })
  @IsNumber()
  @IsNotEmpty()
  deliveryFees: number;

  @ApiProperty({ description: 'Description du restaurant', example: 'Un restaurant traditionnel français' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'ID du propriétaire du restaurant', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  rating?: number;
} 