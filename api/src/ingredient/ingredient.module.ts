import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ingredient, IngredientSchema } from 'schemas/ingredient.schema';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { IngredientsController } from 'src/ingredient/ingredients.controller';
import { IngredientController } from 'src/ingredient/ingredient.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  providers: [IngredientService],
  controllers: [IngredientsController, IngredientController],
})
export class IngredientModule {}
