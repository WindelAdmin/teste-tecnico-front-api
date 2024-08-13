import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Ingredient } from './ingredient.dto';

export class RecipeCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String, example: 'Torta' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: true,
    type: String,
    example: 'Sobremesa para ocasiões familiares',
  })
  description: string;

  @IsNotEmpty()
  @IsArray({ each: true })
  @ApiProperty({
    required: true,
    type: [Ingredient],
    example: [{ name: 'Farinha de Trigo', quantity: 2 }],
  })
  @Type(() => Ingredient)
  @ValidateNested({ each: true })
  ingredients: Ingredient[];

  @IsString()
  @ApiProperty({ required: true, type: String, example: 'Massas' })
  category: String;

  @IsBoolean()
  @ApiProperty({ type: Boolean, example: true })
  isFavorite: boolean;
}
