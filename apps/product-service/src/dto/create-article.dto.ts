import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, Min, Max, Length } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ 
    description: 'Nom de l\'article', 
    example: 'Burger Classique',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @ApiProperty({ 
    description: 'Description de l\'article', 
    example: 'Un burger traditionnel avec salade, tomate et oignon',
    maxLength: 500
  })
  @IsString()
  @IsOptional()
  @Length(0, 500)
  description?: string;

  @ApiProperty({ 
    description: 'Prix de l\'article en euros', 
    example: 8.99,
    minimum: 0,
    maximum: 1000
  })
  @IsNumber()
  @Min(0)
  @Max(1000)
  price: number;

  @ApiProperty({ 
    description: 'Type d\'article (ex: Burger, Tacos, Frites...)', 
    example: 'Burger',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  type: string;

  @ApiProperty({ 
    description: 'ID du restaurant auquel l\'article appartient', 
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty()
  restaurantId: string;

  @ApiProperty({ 
    description: 'Stock initial de l\'article', 
    example: 100,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ 
    description: 'Disponibilité initiale de l\'article', 
    example: true
  })
  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean;
} 