import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Ingredient } from 'schemas/ingredient.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
  @Prop()
  name: string;

  @Prop([String])
  steps: string[];

  @Prop([Number])
  timers: number[];

  @Prop()
  imageUrl: string;

  @Prop()
  originalUrl: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Ingredient.name }],
  })
  ingredients: Ingredient[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

RecipeSchema.plugin(mongoosePaginate);
