import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @ApiProperty({ description: 'Nom de l\'article', example: 'Burger Classique', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Description de l\'article', example: 'Un burger traditionnel avec salade, tomate et oignon', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Prix de l\'article', example: 8.99, required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'Type d\'article', example: 'Burger', required: false })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ description: 'Stock', example: 100, required: false })
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiProperty({ description: 'Disponibilité', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
} 