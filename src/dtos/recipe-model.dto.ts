import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
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
    example: { name: 'Farinha de Trigo', quantity: 2 },
  })
  ingredients: Ingredient[];

  @IsString()
  @ApiProperty({ required: true, type: String, example: 'Massas' })
  category: String;
}
