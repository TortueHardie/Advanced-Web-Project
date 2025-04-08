import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, Min, IsUUID } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ description: 'Nom du menu', example: 'Menu du Jour' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description du menu', example: 'Un menu complet avec entrée, plat et dessert' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Prix du menu', example: 15.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'ID du restaurant', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsNotEmpty()
  restaurantId: string;

  @ApiProperty({ description: 'IDs des articles du menu', example: ['123e4567-e89b-12d3-a456-426614174001', '123e4567-e89b-12d3-a456-426614174002'] })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  itemIds: string[];
} 