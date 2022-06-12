import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MetaDocument = Meta & Document;

@Schema()
export class Meta {
  @Prop()
  initialized: boolean;
}

export const MetaSchema = SchemaFactory.createForClass(Meta);
