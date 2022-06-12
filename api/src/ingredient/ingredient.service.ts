import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient, IngredientDocument } from 'schemas/ingredient.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient.name) private model: Model<IngredientDocument>,
  ) {}

  public getAll() {
    return this.model.find().exec();
  }

  public getAllUniqueProductsName() {
    return this.model.distinct('name').sort().exec();
  }

  public getAllUniqueTypes() {
    return this.model.distinct('type').sort().exec();
  }

  public getById(id: string) {
    return this.model.findById(id).exec();
  }
}
