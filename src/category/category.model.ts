import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongoose';

export interface CategoryModel extends Base {}
export class CategoryModel extends TimeStamps {
  @prop({ default: 'section' })
  name: string;

  @prop({ default: 'Id' })
  owner: ObjectId;

  @prop({ default: 'section' })
  ownerName: string;

  @prop()
  section?: ObjectId;

  @prop()
  sectionName?: string;

  @prop()
  isSection?: boolean;

  @prop({ default: false })
  isArchived?: boolean;
}
