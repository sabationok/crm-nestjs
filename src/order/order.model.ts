import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
export type OrderDocument = HydratedDocument<Order>;

@Schema({ versionKey: false })
export class IPaymentinfo {
  @Prop({ default: null })
  type?: 'iban' | 'card' | 'iban_bonuses' | 'card_bonuses';

  @Prop({ default: 'pending' })
  status?: 'pending' | 'success' | 'rejected' | 'modified';

  @Prop({ default: 0 })
  blockedFunds?: number;

  @Prop({ default: 0 })
  total?: number;
}
@Schema({ versionKey: false })
export class OrderItemComponent {
  @Prop({ default: null, type: () => [Types.ObjectId] })
  _id?: Types.ObjectId;

  @Prop({ default: null })
  atribute_1?: string;

  @Prop({ default: null })
  atribute_2?: string;

  @Prop({ default: 0 })
  quantity?: number;

  @Prop({ default: 0 })
  price?: number;

  @Prop({ default: 0 })
  sale?: number;

  @Prop({ default: 0 })
  summ?: number;

  @Prop({ default: 0 })
  saleSumm?: number;
}

@Schema({ versionKey: false })
export class OrderItem {
  @Prop({ default: null, type: () => [Types.ObjectId] })
  _id?: Types.ObjectId;

  @Prop({ default: null })
  imgUrl?: string;

  @Prop({ default: null })
  name?: string;

  @Prop({ default: null })
  sku?: string;

  @Prop({ default: 0 })
  totalPrice?: number;

  @Prop({ default: null })
  ttn?: string;

  @Prop({ default: 0 })
  ttnCost?: number;

  @Prop({ default: { OrderItemComponent } })
  components?: OrderItemComponent[];
}

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Order {
  @Prop({ default: null, unique: false })
  number?: string;

  @Prop({ default: null, type: () => Types.ObjectId })
  creator: Types.ObjectId;

  @Prop({ default: null, type: () => Types.ObjectId })
  updator: Types.ObjectId;

  @Prop({ default: 'standart' })
  type?: 'standart' | 'mix';

  @Prop({ default: 'new' })
  status?: 'new' | 'inWork' | 'success' | 'rejected' | 'canceled' | 'archived';

  @Prop({ type: () => Types.ObjectId })
  managerId?: Types.ObjectId;

  @Prop({ default: { IPaymentinfo }, _id: false })
  payment?: IPaymentinfo;

  @Prop({ default: [], type: () => [Types.ObjectId] })
  contentIdArr?: Types.ObjectId[];

  @Prop({ default: [], type: () => [OrderItem] })
  content?: OrderItem[];

  @Prop({ default: 0 })
  totalPrice?: number;

  @Prop({ default: 0 })
  totalDeliveriesCount?: number;

  @Prop({ default: [], type: () => [Object] })
  deliveries?: ObjectId[];
}

export const OrderModel = SchemaFactory.createForClass(Order);
