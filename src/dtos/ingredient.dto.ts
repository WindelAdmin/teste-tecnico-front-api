import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Ingredient {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: true, type: Number, example: '1' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String, example: 'Farinha de trigo' })
  name: string;

  @IsInt()
  @ApiProperty({ required: true, type: Number, example: '1' })
  quantity: number;
}
