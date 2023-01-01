import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongoose';

export class IPaymentinfo {
  @prop({ default: null })
  type: 'iban' | 'card' | 'iban_bonuses' | 'card_bonuses';

  @prop({ default: null })
  status: 'pending' | 'success' | 'rejected';

  @prop({ default: 0 })
  blockedFunds: number;

  @prop({ default: 0 })
  total: number;
}

export interface OrderModel extends Base {}
export class OrderModel extends TimeStamps {
  @prop({ unique: true })
  number: string;

  @prop({ default: 'standart' })
  type: 'standart' | 'complex';

  @prop({ default: 'new' })
  status: 'new' | 'inWork' | 'success' | 'rejected' | 'canceled' | 'archived';

  @prop()
  managerId: ObjectId;

  @prop({ default: { IPaymentinfo }, _id: false })
  payment: IPaymentinfo;

  @prop({ default: null })
  content: ObjectId[];

  @prop({ default: null })
  deliveries: ObjectId[];
}
