import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongoose';

export class ProductPriceInfo {
  @prop({ default: 0 })
  price?: number;

  @prop({ default: 0 })
  cost?: number;

  @prop({ default: 'UAH' })
  currency?: string;

  @prop({ default: 0 })
  sale?: number;

  @prop({ default: false })
  isCommission?: boolean;
}
export class SectionInfo {
  @prop({ default: null })
  id: ObjectId;

  @prop({ default: '000' })
  name: string;
}
export class CategoryInfo {
  @prop({ default: null })
  ownerId: ObjectId;

  @prop({ default: '000' })
  owner: string;

  @prop({ default: null })
  id: ObjectId;

  @prop({ default: '000' })
  name: string;
}
export class ProductCategoryInfo {
  @prop({ default: { SectionInfo }, _id: false })
  section: SectionInfo;

  @prop({ default: { CategoryInfo }, _id: false })
  category: CategoryInfo;
}
export class ProductAvailabilityInfo {
  @prop({ default: 'notAvailable' })
  availability: 'available' | 'notAvailable' | 'awaiting';

  @prop({ default: false })
  standartOrder?: boolean;

  @prop({ default: 0 })
  standartOrderTime?: number;

  @prop({ default: false })
  specialOrder?: boolean;

  @prop({ default: 0 })
  specialOrderTime?: number;
}

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {
  @prop({ default: false })
  isApproved: boolean;

  @prop({ default: false })
  isVisible: boolean;

  @prop({ default: null })
  sku: string;

  @prop({ default: 'Назва товару' })
  name: string;

  @prop({ default: 'Назва бренду' })
  brand: string;

  @prop({ default: { ProductPriceInfo }, _id: false })
  priceInfo: ProductPriceInfo;

  @prop({ default: { ProductCategoryInfo }, _id: false })
  categoryInfo: ProductCategoryInfo;

  @prop({ default: { ProductAvailabilityInfo }, _id: false })
  availabilityInfo: ProductAvailabilityInfo;

  @prop({ default: null })
  description: string;

  @prop({ default: null })
  innerComment: string;

  @prop({ type: () => [String] })
  images: string[];
}
