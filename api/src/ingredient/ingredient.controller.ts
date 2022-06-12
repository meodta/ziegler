import { Controller, Get, Param } from '@nestjs/common';
import { IngredientService } from 'src/ingredient/ingredient.service';

@Controller('ingredient')
export class IngredientController {
  constructor(private service: IngredientService) {}

  @Get(':id')
  public get(@Param('id') id) {
    return this.service.getById(id);
  }
}
