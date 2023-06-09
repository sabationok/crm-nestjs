import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
  ObjectId,
  SchemaTypes,
  Types,
  Document,
} from 'mongoose';
import { User } from 'src/auth/user.model';
import { Product } from 'src/product/product.model';
import { Shipment, ShipmentDocument } from 'src/shipments/shipment.model';
// export type OrderDocument = HydratedDocument<Order>;
export type OrderDocument = Order & Document;

@Schema({ _id: false, timestamps: false, versionKey: false })
export class IPaymentinfo {
  @Prop({ default: null })
  type?: 'iban' | 'card' | 'iban_bonuses' | 'card_bonuses' | 'forFree';

  @Prop({ default: 'pending' })
  status?: 'pending' | 'success' | 'rejected' | 'modified';

  @Prop({ default: 0 })
  blockedFunds?: number;

  @Prop({ default: 0 })
  total?: number;
}

@Schema({ _id: false, timestamps: false, versionKey: false })
export class OrderItemComponent {
  @Prop({ default: null, ref: 'Products', type: () => [Types.ObjectId] })
  _id?: Types.ObjectId;

  @Prop({ default: null })
  sku?: string;

  @Prop({ default: null })
  atribute_1?: string;

  @Prop({ default: null })
  atribute_2?: string;

  @Prop({ default: 0 })
  quantity?: number;

  @Prop({ default: 0 })
  price?: number;

  @Prop({ default: 0 })
  total?: number;
}

@Schema({ _id: false, timestamps: false, versionKey: false })
export class OrderItem {
  @Prop({ default: null, ref: Product.name, type: Types.ObjectId })
  itemInfo?: Product;

  @Prop({ default: 0 })
  quantity?: number;

  @Prop({ default: 0 })
  price?: number;

  @Prop({ default: 0 })
  total?: number;

  @Prop({ default: null, type: Types.ObjectId, ref: Shipment.name })
  shipment?: Shipment;

  @Prop({ default: { OrderItemComponent } })
  components?: OrderItemComponent[];

  // @Prop({ default: null })
  // imgUrl?: string;

  // @Prop({ default: null })
  // name?: string;

  // @Prop({ default: null })
  // sku?: string;

  // @Prop({ default: 0 })
  // sale?: number;

  // @Prop({ default: 0 })
  // ttnCost?: number;
}

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Order {
  @Prop({ default: '000000000000', unique: false })
  number?: string;

  // @Prop({ type: Types.ObjectId, ref: User.name })
  // creator?: User;

  // @Prop({ type: Types.ObjectId, ref: User.name })
  // updator?: User;

  // @Prop({ default: 'standart' })
  // type?: 'standart' | 'mix';

  @Prop({ default: 'new' })
  status?: 'new' | 'inWork' | 'success' | 'rejected' | 'archived';

  @Prop({ type: Types.ObjectId, ref: User.name })
  managerId?: User;

  // @Prop({ default: { IPaymentinfo } })
  // payment?: IPaymentinfo;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  contentIdArr?: OrderItem[];

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  content?: OrderItem[];

  // @Prop({ default: 0 })
  // totalValue?: number;

  // @Prop({ default: 0 })
  // totalShipmentsCount?: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: Shipment.name }] })
  shipments?: Shipment[];
}

export const OrderModel = SchemaFactory.createForClass(Order);
