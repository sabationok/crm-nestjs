import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Category {
  @Prop({ default: 'section' })
  name: string;

  @Prop({ default: 'Id', type: () => Object })
  owner: ObjectId;

  @Prop({ default: 'section' })
  ownerName: string;

  @Prop({ type: () => Object })
  section?: ObjectId;

  @Prop()
  sectionName?: string;

  @Prop()
  isSection?: boolean;

  @Prop({ default: false })
  isArchived?: boolean;
}

export const CategoryModel = SchemaFactory.createForClass(Category);
