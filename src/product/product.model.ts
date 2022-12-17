import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {
  @prop({ default: false })
  isApproved: boolean;

  @prop({ default: false })
  isVisible: boolean;

  @prop({ default: null })
  createdByAuthorName: string;

  @prop({ default: null })
  createdByAuthorId: string;

  @prop({ default: null })
  createdByAuthorType: string;

  @prop({ default: null })
  updatedByAuthorName: string;

  @prop({ default: null })
  updatedByAuthorId: string;

  @prop({ default: null })
  updatedByAuthorType: string;

  @prop({ default: 'Назва товару' })
  name: string;

  @prop({ default: 'Назва бренду' })
  brand: string;

  @prop({ default: 0 })
  price: number;

  @prop({ default: 0 })
  cost: number;

  @prop({ default: 0 })
  currency: string;

  @prop({ default: 0 })
  sale: number;

  @prop({ default: null })
  sectionId: string;

  @prop({ default: null })
  section: string;

  @prop({ default: null })
  parentCategoryId: string;

  @prop({ default: null })
  parentCategory: string;

  @prop({ default: null })
  categoryId: string;

  @prop({ default: null })
  category: string;

  @prop({ default: null })
  availability: string;

  @prop({ default: null })
  description: string;

  @prop({ default: null })
  innerComment: string;

  @prop({ type: () => [String] })
  images: string[];
}
