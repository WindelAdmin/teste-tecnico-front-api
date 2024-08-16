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

@Controller('recipe')
export class RecipeController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiOkResponse({ type: RecipeModelDto, isArray: true })
  async create(@Body() data: RecipeCreateDto): Promise<RecipeModelDto> {
    return await this.appService.create(data);
  }

  @Delete(':id')
  @ApiOkResponse({
    schema: {
      example: 'Receita deletada com sucesso.',
    },
  })
  async delete(@Param('id') id: number) {
    await this.appService.delete(+id);
    return { message: 'Receita deletada com sucesso.' };
  }

  @Post('/delete-in-batch')
  @ApiOkResponse({
    schema: {
      example: 'Receitas deletadas com sucesso.',
    },
  })
  async deleteInBatch(@Body() registers: RecipeDeleteInBatchDto) {
    await this.appService.deleteInBatch(registers.registersId);
    return { message: 'Receitas deletadas com sucesso.' };
  }

  @Get()
  @ApiOkResponse({ type: RecipeModelDto, isArray: true })
  findMany(@Query() params: RecipeFindManyFilters) {
    return this.appService.findMany(params);
  }

  @Get('/:id')
  @ApiOkResponse({ type: RecipeModelDto })
  async findOne(@Param('id') id: string) {
    return this.appService.findOne(+id);
  }
}
