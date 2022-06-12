import { Controller, Get } from '@nestjs/common';
import { IngredientService } from 'src/ingredient/ingredient.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private service: IngredientService) {}

  @Get()
  public getAll() {
    return this.service.getAll();
  }

  @Get('unique-names')
  public getAllUniqueProductsName() {
    return this.service.getAllUniqueProductsName();
  }

  @Get('unique-types')
  public getAllUniqueTypes() {
    return this.service.getAllUniqueTypes();
  }
}
