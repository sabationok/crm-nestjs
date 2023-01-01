import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongoose';

export type TUserRoles =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'MANAGER'
  | 'TOP_MANAGER'
  | 'VENDOR'
  | 'VENDOR_MANAGER'
  | 'USER'
  | 'GUEST';
export type TUserStatus = 'ACTIVE' | 'NOT_ACTIVE' | 'BAN';

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop()
  passwordHash: string;

  @prop({ default: null })
  name: string;

  @prop({ default: null, unique: true })
  phone: string;

  @prop({ default: 'GUEST' })
  role: TUserRoles;

  @prop({ default: 'NOT_ACTIVE' })
  status: TUserStatus;

  @prop()
  manager: ObjectId;

  @prop({ type: () => [String] })
  vendors: string[];
}
