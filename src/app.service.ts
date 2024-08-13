import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RecipeFindManyFilters } from './dtos/find-many-filters.dto';
import { RecipeCreateDto } from './dtos/recipe-create.dto';
import { prisma } from './prisma.service';
@Injectable()
export class AppService {
  async create(data: RecipeCreateDto) {
    if (await prisma.recipe.findFirst({ where: { name: data.name } }))
      throw new ConflictException('Receita com este nome já existe');

    const { ingredients, ...rest } = data;
    return await prisma.recipe.create({
      data: {
        ...rest,
        ingredients: {
          create: ingredients,
        },
      },
      include: {
        ingredients: {
          select: {
            id: true,
            name: true,
            quantity: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    if (!(await this.validateExistId(id)))
      throw new NotFoundException('Receita não existe para ser deletada.');
    return await prisma.recipe.delete({ where: { id } });
  }

  async deleteInBatch(registersId: number[]) {
    if (!(await this.validateExistIds(registersId)))
      throw new NotFoundException(
        'Uma ou mais receitas não existem para serem deletadas.',
      );

    return await prisma.recipe.deleteMany({
      where: { id: { in: registersId } },
    });
  }

  async findMany(params: RecipeFindManyFilters) {
    const { description } = params;
    return await prisma.recipe.findMany({
      where: {
        ...(description && {
          description: { contains: description },
        }),
      },
      include: {
        ingredients: {
          select: {
            id: true,
            name: true,
            quantity: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    if (!(await this.validateExistId(id)))
      throw new NotFoundException('Receita não encontrada.');

    return await prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: {
          select: {
            id: true,
            name: true,
            quantity: true,
          },
        },
      },
    });
  }

  async update(id: number, data: RecipeCreateDto) {
    if (!(await this.validateExistId(id)))
      throw new NotFoundException('Receita não encontrada.');

    const { ingredients, ...rest } = data;
    return await prisma.recipe.update({
      where: { id },
      data: {
        ...rest,
        ingredients: {
          updateMany: ingredients.map((ingredient) => ({
            where: { id: ingredient.id },
            data: { ...ingredient },
          })),
        },
      },
      include: {
        ingredients: {
          select: {
            id: true,
            name: true,
            quantity: true,
          },
        },
      },
    });
  }

  async validateExistId(id: number): Promise<Boolean> {
    return (await prisma.recipe.findUnique({ where: { id } })) ? true : false;
  }

  async validateExistIds(ids: number[]): Promise<Boolean> {
    const result = await prisma.recipe.findMany({ where: { id: { in: ids } } });
    return result.length == ids.length;
  }
}
