import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  toJSON: {
    transform(doc: CategoryDocument, ret) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String })
  color?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
