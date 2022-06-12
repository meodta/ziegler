import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from 'schemas/recipe.schema';
import { RecipeService } from 'src/recipe/recipe.service';
import { RecipesController } from 'src/recipe/recipes.controller';
import { RecipeController } from 'src/recipe/recipe.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  providers: [RecipeService],
  controllers: [RecipesController, RecipeController],
})
export class RecipeModule {}
