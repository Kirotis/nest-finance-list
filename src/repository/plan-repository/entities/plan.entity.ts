import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

export type PlanDocument = Plan & Document;

export enum PlanType {
  MAX,
  MIN,
  CURRENT,
}

@Schema({
  toJSON: {
    transform(doc: PlanDocument, ret) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class Plan {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: Date, default: new Date() })
  createDate: Date;

  @Prop({ type: Number, required: true, min: 0 })
  moneySubject: number;

  @Prop({ enum: PlanType, default: PlanType.CURRENT })
  type: PlanType;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }], default: [] })
  categories: ObjectId[];
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
