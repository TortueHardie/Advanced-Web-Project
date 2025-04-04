import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, Max, Length } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({ 
    description: 'Nom du restaurant', 
    example: 'Le Petit Bistrot',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @ApiProperty({ 
    description: 'Ville où se trouve le restaurant', 
    example: 'Paris',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  city: string;

  @ApiProperty({ 
    description: 'Frais de livraison en euros', 
    example: 2.5,
    minimum: 0,
    maximum: 20
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(20)
  deliveryFees: number;

  @ApiProperty({ 
    description: 'Description détaillée du restaurant', 
    example: 'Un restaurant traditionnel français',
    minLength: 10,
    maxLength: 1000
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 1000)
  description: string;

  @ApiProperty({ 
    description: 'ID du propriétaire du restaurant (doit être un utilisateur avec le rôle RESTAURATEUR)', 
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;

  @ApiProperty({ 
    description: 'Adresse complète du restaurant', 
    example: '123 rue de la Paix',
    minLength: 5,
    maxLength: 200
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 200)
  address: string;

  @ApiProperty({ 
    description: 'Note moyenne du restaurant (sur 5)', 
    example: 4.5,
    minimum: 0,
    maximum: 5,
    required: false
  })
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  rating?: number;
} 