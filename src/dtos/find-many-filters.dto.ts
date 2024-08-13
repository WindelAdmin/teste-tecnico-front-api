import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RecipeFindManyFilters {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  description: string;
}
