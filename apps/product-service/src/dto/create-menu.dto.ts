import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, Min } from 'class-validator';

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

  @ApiProperty({ description: 'ID du restaurant', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({ description: 'IDs des articles du menu', example: [1, 2, 3] })
  @IsArray()
  @IsNotEmpty()
  articleIds: number[];
} 