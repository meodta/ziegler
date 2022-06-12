import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Recipe, RecipeDocument } from 'schemas/recipe.schema';
import { IngredientDocument } from 'schemas/ingredient.schema';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name)
    private model: PaginateModel<RecipeDocument>,
  ) {}

  public getAll(page = 1, limit?: number) {
    return this.model.paginate(
      {},
      {
        page,
        limit,
        pagination: !!limit,
        populate: 'ingredients',
      },
    );
  }

  public getAllWithProducts(products: IngredientDocument['name'][]) {
    return this.model
      .aggregate([
        {
          $lookup: {
            from: 'ingredients',
            localField: 'ingredients',
            foreignField: '_id',
            as: 'ingredients',
          },
        },
        {
          $match: {
            'ingredients.name': {
              $in: products,
            },
          },
        },
      ])
      .exec();
  }

  public getAllWithCookingTimeLessEqual(than: number) {
    return this.model
      .aggregate([
        {
          $set: {
            totalTime: {
              $sum: '$timers',
            },
          },
        },
        {
          $match: {
            totalTime: {
              $lte: than,
            },
          },
        },
      ])
      .exec();
  }

  public getById(id: string) {
    return this.model.findById(id).populate('ingredients').exec();
  }
}
