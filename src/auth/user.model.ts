import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export type TUserRoles =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'MANAGER'
  | 'TOP_MANAGER'
  | 'VENDOR'
  | 'SUPLYER_MANAGER'
  | 'CUSTOMER'
  | 'GUEST';

export type TUserStatus = 'ACTIVE' | 'NOT_ACTIVE' | 'BAN';

@Schema({ _id: true, timestamps: true, versionKey: false })
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop({ default: null })
  name: string;

  @Prop({ default: null, unique: true })
  phone: string;

  @Prop({ default: 'GUEST' })
  role: TUserRoles;

  @Prop({ default: 'NOT_ACTIVE' })
  status: TUserStatus;

  @Prop({ type: () => Object })
  manager?: ObjectId;

  @Prop({ type: () => [String] })
  vendors?: string[];
}

export const UserModel = SchemaFactory.createForClass(User);
