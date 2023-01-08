import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.model';

export type FindUserDocument = HydratedDocument<FindUser>;

@Schema({ _id: true, timestamps: true, versionKey: false })
export class FindUser extends User {
  @Prop({ type: () => Types.ObjectId })
  _id?: Types.ObjectId;
}

export const FindUserModel = SchemaFactory.createForClass(FindUser);
