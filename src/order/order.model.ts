import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
  ObjectId,
  SchemaTypes,
  Types,
  Document,
} from 'mongoose';
import { User } from 'src/auth/user.model';
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
  @Prop({ default: null, ref: 'Products', type: () => [Types.ObjectId] })
  _id?: Types.ObjectId;

  // @Prop({ default: null })
  // imgUrl?: string;

  // @Prop({ default: null })
  // name?: string;

  // @Prop({ default: null })
  // sku?: string;

  @Prop({ default: 0 })
  quantity?: number;

  @Prop({ default: 0 })
  price?: number;

  @Prop({ default: 0 })
  sale?: number;

  @Prop({ default: 0 })
  total?: number;

  @Prop({ default: null, ref: 'Shipments' })
  shipment?: Types.ObjectId;

  // @Prop({ default: 0 })
  // ttnCost?: number;

  @Prop({ default: { OrderItemComponent } })
  components?: OrderItemComponent[];
}

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Order {
  @Prop({ default: null, unique: false })
  number?: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  creator?: User;

  // @Prop({ ref: User.name, type: Types.ObjectId })
  // updator?: User;

  @Prop({ default: 'standart' })
  type?: 'standart' | 'mix';

  @Prop({ default: 'new' })
  status?: 'new' | 'inWork' | 'success' | 'rejected' | 'archived';

  // @Prop({ ref: User.name, type: Types.ObjectId })
  // managerId?: User;

  @Prop({ default: { IPaymentinfo } })
  payment?: IPaymentinfo;

  @Prop({ default: [], type: () => [Types.ObjectId] })
  contentIdArr?: Types.ObjectId[];

  @Prop({ default: [OrderItem], type: () => [OrderItem] })
  content?: OrderItem[];

  @Prop({ default: 0 })
  totalValue?: number;

  @Prop({ default: 0 })
  totalShipmentsCount?: number;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
  // owner: Owner[];

  @Prop({ type: [{ type: Types.ObjectId, ref: Shipment.name }] })
  shipments?: Shipment[];
}

export const testOrder =
  'test =======================================================';

export const OrderModel = SchemaFactory.createForClass(Order);
