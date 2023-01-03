import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, ObjectId } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ versionKey: false })
export class IPaymentinfo {
  @Prop({ default: null })
  type: 'iban' | 'card' | 'iban_bonuses' | 'card_bonuses';

  @Prop({ default: null })
  status: 'pending' | 'success' | 'rejected';

  @Prop({ default: 0 })
  blockedFunds: number;

  @Prop({ default: 0 })
  total: number;
}

@Schema({ versionKey: false })
export class Product {}

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Order {
  @Prop({ unique: true })
  number: string;

  @Prop({ default: 'standart' })
  type: 'standart' | 'complex';

  @Prop({ default: 'new' })
  status: 'new' | 'inWork' | 'success' | 'rejected' | 'canceled' | 'archived';

  @Prop({ type: () => Object })
  managerId: ObjectId;

  @Prop({ default: { IPaymentinfo }, _id: false })
  payment: IPaymentinfo;

  @Prop({ default: null })
  content: ObjectId[];

  @Prop({ default: null })
  deliveries: ObjectId[];
}

export const OrderModel = SchemaFactory.createForClass(Order);
