import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type UserDocument = User | Document;

@Schema({
  toJSON: {
    transform(doc: UserDocument, ret) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class User {
  readonly id?: ObjectId;
  @Prop()
  readonly login: string;

  @Prop()
  readonly password: string;

  @Prop()
  readonly dateCreated: number;

  @Prop()
  readonly description: string;

  @Prop()
  readonly avatarImage?: string;
}

export type RegisterUser = Pick<
  User,
  'avatarImage' | 'description' | 'login' | 'password'
>;

export type UserDTO = Partial<Omit<User, 'passport'>>;

export const UserSchema = SchemaFactory.createForClass(User);
