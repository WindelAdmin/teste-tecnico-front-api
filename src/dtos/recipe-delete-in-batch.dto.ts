import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class RecipeDeleteInBatchDto {
  @ApiProperty({ required: true, type: [Number] })
  @IsArray()
  registersId: number[];
}
