import {
  Controller,
  Get,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RecipeService } from 'src/recipe/recipe.service';

@Controller('recipes')
export class RecipesController {
  constructor(private service: RecipeService) {}

  @Get()
  public getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.service.getAll(page, limit);
  }

  @Get('with-products')
  public getAllWithProducts(
    @Query('products', new ParseArrayPipe({ items: String, separator: ',' }))
    products: string[],
  ) {
    return this.service.getAllWithProducts(products);
  }

  @Get('with-total-time')
  public getAllWithTotalTimeLte(
    @Query('time', new ParseIntPipe()) time: number,
  ) {
    return this.service.getAllWithCookingTimeLessEqual(time);
  }
}
