import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { HydratedDocument, ObjectId } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Category {
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

export const CategoryModel = SchemaFactory.createForClass(Category);
