import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ICompanyBase } from '../permissions/permission.model';
import { User } from '../auth/user.model';

export type RoleDocument = HydratedDocument<Role>;
@Schema({ _id: true, timestamps: true, versionKey: false })
export class Role {
  @Prop()
  actions: string[];

  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: ICompanyBase;
}

export const RoleModel = SchemaFactory.createForClass(Role);
