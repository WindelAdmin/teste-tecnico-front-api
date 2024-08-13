import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Ingredient } from './ingredient.dto';

export class RecipeModelDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: Number, example: 1 })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Torta' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'Sobremesa para ocasiões familiares',
  })
  description: string;

  @IsNotEmpty()
  @IsArray({ each: true })
  @ApiProperty({
    type: [Ingredient],
    example: { name: 'Farinha de Trigo', quantity: 2 },
  })
  ingredients: Ingredient[];

  @IsString()
  @ApiProperty({ type: String, example: 'Massas' })
  category: String;

  @IsBoolean()
  @ApiProperty({ type: Boolean, example: true })
  isFavorite: boolean;
}
