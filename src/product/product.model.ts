import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ versionKey: false })
export class ProductPriceInfo {
  @Prop({ default: 0 })
  price?: number;

  @Prop({ default: 0 })
  cost?: number;

  @Prop({ default: 'UAH' })
  currency?: string;

  @Prop({ default: 0 })
  sale?: number;

  @Prop({ default: false })
  isCommission?: boolean;
}
@Schema({ versionKey: false })
export class SectionInfo {
  @Prop({ default: null, type: () => Object })
  _id?: ObjectId;

  @Prop({ default: '000' })
  name?: string;
}
@Schema({ versionKey: false })
export class CategoryInfo {
  @Prop({ default: null, type: () => Object })
  ownerId?: ObjectId;

  @Prop({ default: '000' })
  owner?: string;

  @Prop({ default: null, type: () => Object })
  _id?: ObjectId;

  @Prop({ default: '000' })
  name?: string;
}
@Schema({ versionKey: false })
export class ProductCategoryInfo {
  @Prop({ default: { SectionInfo }, _id: false })
  section?: SectionInfo;

  @Prop({ default: { CategoryInfo }, _id: false })
  category?: CategoryInfo;
}
@Schema({ versionKey: false })
export class ProductAvailabilityInfo {
  @Prop({ default: 'notAvailable' })
  availability?: 'available' | 'notAvailable' | 'awaiting';

  @Prop({ default: false })
  standartOrder?: boolean;

  @Prop({ default: 0 })
  standartOrderTime?: number;

  @Prop({ default: false })
  specialOrder?: boolean;

  @Prop({ default: 0 })
  specialOrderTime?: number;
}

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Product {
  @Prop({ default: false })
  isApproved?: boolean;

  @Prop({ default: false })
  isVisible?: boolean;

  @Prop({ default: null })
  sku?: string;

  @Prop({ default: 'Назва товару' })
  name?: string;

  @Prop({ default: 'Назва бренду' })
  brand?: string;

  @Prop({ default: { ProductPriceInfo }, _id: false })
  priceInfo?: ProductPriceInfo;

  @Prop({ default: { ProductCategoryInfo }, _id: false })
  categoryInfo?: ProductCategoryInfo;

  @Prop({ default: { ProductAvailabilityInfo }, _id: false })
  availabilityInfo?: ProductAvailabilityInfo;

  @Prop({ default: null })
  description?: string;

  @Prop({ default: null })
  innerComment?: string;

  @Prop({ default: [], type: () => [String] })
  images?: string[];
}

export const ProductModel = SchemaFactory.createForClass(Product);
