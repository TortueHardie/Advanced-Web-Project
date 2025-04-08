import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class UpdateMenuDto {
  @ApiProperty({ description: 'Nom du menu', example: 'Menu du Jour', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Description du menu', example: 'Un menu complet avec entrée, plat et dessert', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Prix du menu', example: 15.99, required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'IDs des articles du menu', example: ['123e4567-e89b-12d3-a456-426614174001', '123e4567-e89b-12d3-a456-426614174002'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  itemIds?: string[];
} 