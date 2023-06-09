import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../auth/user.model';
import { Role } from '../roles/role.model';

export type PermissionDocument<T = any> = HydratedDocument<Permission & T>;

export interface ICompanyBase {}

export enum PermissionStatus {
  REJECTED = 'rejected',
  PENDING = 'pending',
  ACCEPTED = 'accepted',
}
@Schema({ _id: true, timestamps: true, versionKey: false })
export class Permission {
  @Prop({ type: Types.ObjectId, ref: User.name, default: null })
  owner?: User;

  @Prop({ type: () => PermissionStatus, default: PermissionStatus.PENDING })
  status?: PermissionStatus;

  @Prop({ type: Types.ObjectId, ref: 'Companies', default: null })
  company?: ICompanyBase;

  @Prop({ type: Types.ObjectId, ref: User.name, default: null })
  user?: User;

  @Prop({ type: Types.ObjectId, ref: Role.name, default: null })
  role?: ICompanyBase;
}

export const PermissionModel = SchemaFactory.createForClass(Permission);
