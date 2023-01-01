import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongoose';

export interface CategoryModel extends Base {}
export class CategoryModel extends TimeStamps {
  @prop({ default: 'categoryName' })
  name: string;

  @prop({ default: 'parentId' })
  owner: ObjectId;

  @prop({ default: 'parentName' })
  ownerName: string;

  @prop({ default: false })
  isSection: boolean;
}
