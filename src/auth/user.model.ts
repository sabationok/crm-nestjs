import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, ObjectId, Types } from 'mongoose';

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

@Schema({ versionKey: false })
export class Manager {
  @Prop({ type: () => [Types.ObjectId] })
  vendors?: Types.ObjectId[];
}

@Schema({ versionKey: false })
export class Vendor {
  @Prop({ type: () => Types.ObjectId })
  managerId?: Types.ObjectId;

  @Prop()
  managerCode?: string;
}

@Schema({ _id: true, timestamps: true, versionKey: false })
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop()
  login?: string;

  @Prop({ default: null })
  name?: string;

  @Prop({ default: null, unique: true })
  phone?: string;

  @Prop({ default: 'GUEST' })
  role?: TUserRoles;

  @Prop({ default: 'NOT_ACTIVE' })
  status?: TUserStatus;

  @Prop({ type: () => Manager })
  manager?: Manager;

  @Prop({ type: () => Vendor })
  vendor?: Vendor;

  @Prop({ default: '' })
  access_token?: string;
}

@Schema({ _id: true, timestamps: true, versionKey: false })
export class FindUser extends User {
  @Prop({ type: () => Types.ObjectId })
  _id?: Types.ObjectId;

  @Prop({ type: () => Date })
  createdAt?: Date;

  @Prop({ type: () => Date })
  updatedAt?: Date;
}

export const UserModel = SchemaFactory.createForClass(User);
