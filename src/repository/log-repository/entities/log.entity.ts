import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, SchemaTypes } from 'mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/repository/category-repository/entities/category.entity';

export type LogDocument = Log & Document;

@Schema({
  toJSON: {
    transform(doc: LogDocument, ret) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class Log {
  @Prop({ type: String })
  title: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Category.name, required: true })
  categoryId: ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  money: number;

  @Prop({ type: SchemaTypes.Date, default: Date.now() })
  date: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
