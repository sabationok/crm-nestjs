import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ _id: false, versionKey: false })
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

@Schema({ _id: false, versionKey: false })
export class CategoryInfo {
  @Prop({ default: '000' })
  sectionName?: string;

  @Prop({ default: null, type: () => Types.ObjectId })
  section?: Types.ObjectId;

  @Prop({ default: null, type: () => Types.ObjectId })
  owner?: Types.ObjectId;

  @Prop({ default: '000' })
  ownerName?: string;

  @Prop({ default: null, type: () => Types.ObjectId })
  _id?: Types.ObjectId;

  @Prop({ default: '000' })
  category?: string;
}

@Schema({ _id: false, versionKey: false })
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

@Schema({ _id: false, versionKey: false })
export class Author {
  @Prop({ default: null })
  _id?: Types.ObjectId;

  @Prop({ default: null })
  role?: string;

  @Prop({ default: null })
  name?: string;
}

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Product {
  @Prop({ default: 'pending' })
  approvedStatus?: 'success' | 'pending' | 'reject';

  @Prop({ default: false })
  visibilityStatus?: boolean;

  @Prop({ default: null, unique: true })
  sku?: string;

  @Prop({ default: 'Назва товару' })
  name?: string;

  @Prop({ default: 'Назва бренду' })
  brand?: string;

  @Prop({ default: { Author }, type: () => Author })
  creator: Author;

  @Prop({ default: { Author }, type: () => Author })
  updator?: Author;

  @Prop({ default: { ProductPriceInfo } })
  priceInfo?: ProductPriceInfo;

  @Prop({ default: null, type: () => Types.ObjectId })
  categoryId: Types.ObjectId;

  @Prop({
    default: () => ProductAvailabilityInfo,
    type: () => ProductAvailabilityInfo,
  })
  availabilityInfo?: ProductAvailabilityInfo;

  @Prop({ default: null })
  description?: string;

  @Prop({ default: null })
  innerComment?: string;

  @Prop({ default: [], type: () => [String] })
  images?: string[];
}

export const ProductModel = SchemaFactory.createForClass(Product);
