import { Controller, Get, Param } from '@nestjs/common';
import { RecipeService } from 'src/recipe/recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private service: RecipeService) {}

  @Get(':id')
  public get(@Param('id') id) {
    return this.service.getById(id);
  }
}
