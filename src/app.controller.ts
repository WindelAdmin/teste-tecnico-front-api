import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { RecipeFindManyFilters } from './dtos/find-many-filters.dto';
import { RecipeCreateDto } from './dtos/recipe-create.dto';
import { RecipeDeleteInBatchDto } from './dtos/recipe-delete-in-batch.dto';
import { RecipeModelDto } from './dtos/recipe-model.dto';

@Controller('receita')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiOkResponse({ type: RecipeModelDto, isArray: true })
  create(@Body() data: RecipeCreateDto): RecipeModelDto {
    return {
      id: 1,
      name: data.name,
      description: data.description,
      ingredients: data.ingredients,
      category: data.category,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {}

  @Post('/batch')
  deleteInBatch(@Body() registers: RecipeDeleteInBatchDto) {
    console.log(registers);
  }

  @Get()
  @ApiOkResponse({ type: RecipeModelDto, isArray: true })
  findMany(@Query() params: RecipeFindManyFilters): string {
    return this.appService.getHello();
  }

  @Get('/:id')
  @ApiOkResponse({ type: RecipeModelDto })
  findOne(@Param('id') id: string): string {
    return 'teste';
  }
}
