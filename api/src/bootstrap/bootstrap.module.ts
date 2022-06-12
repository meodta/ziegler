import { Module } from '@nestjs/common';
import fetch from 'node-fetch';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import {
  Ingredient,
  IngredientDocument,
  IngredientSchema,
} from 'schemas/ingredient.schema';
import { Recipe, RecipeDocument, RecipeSchema } from 'schemas/recipe.schema';
import { Model } from 'mongoose';
import { MetaService } from 'src/meta/meta.service';
import { MetaModule } from 'src/meta/meta.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
      { name: Recipe.name, schema: RecipeSchema },
    ]),
    MetaModule,
  ],
})
export class BootstrapModule {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
    private metaService: MetaService,
  ) {}

  async onModuleInit(): Promise<void> {
    if (await this.metaService.isInitialized())
      return console.log('No need to initialize database.');
    const response = await fetch(
      'https://raw.githubusercontent.com/raywenderlich/recipes/master/Recipes.json',
    );
    try {
      const json = (await response.json()) as Array<Record<string, any>>;
      let allIngredients = [];
      const recipes = json.map((recipe) => {
        const {
          ingredients: rawIngredients,
          imageURL,
          originalURL,
          ...rest
        } = recipe;
        const ingredients = rawIngredients.map(
          (ingredient) => new this.ingredientModel(ingredient),
        );
        allIngredients = allIngredients.concat(ingredients);
        return new this.recipeModel({
          ...rest,
          ingredients,
          imageUrl: imageURL,
          originalUrl: originalURL,
        });
      });
      await Promise.all([
        this.ingredientModel.insertMany(allIngredients),
        this.recipeModel.insertMany(recipes),
        this.metaService.setInitialized(),
      ]);
      console.log('Successfully initialized database.');
    } catch (e) {
      console.error(e);
      await Promise.all([
        this.recipeModel.deleteMany(),
        this.ingredientModel.deleteMany(),
        this.metaService.setInitialized(false),
      ]);
      throw new Error('Failed to initialize database.');
    }
  }
}
