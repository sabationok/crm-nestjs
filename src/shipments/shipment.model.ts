import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/user.model';
import { Order } from '../order/order.model';

// export type ShipmentDocument = HydratedDocument<Shipment>;
export type ShipmentDocument = Shipment & Document;

export class TransporterTtnDto {
  // @Prop({ default: 'selfPickup' })
  // type?: 'selfPickup' | 'courier' | 'shipping';
  // @Prop()
  // declaredValue?: number;
  // @Prop()
  // cost?: number;
  // @Prop()
  // comment: string;
  // @Prop()
  // destination: string;
}
@Schema({ _id: false, timestamps: false, versionKey: false })
export class ShipmentContent {
  @Prop({ type: Types.ObjectId })
  _id?: Types.ObjectId;
  @Prop()
  sku?: string;
  @Prop()
  price?: number;
  @Prop()
  quantity?: number;
  @Prop()
  summ?: number;
}

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Shipment {
  @Prop({ type: Types.ObjectId, ref: 'Company' })
  owner?: 'Company';
  @Prop({ type: Types.ObjectId, ref: Order.name })
  order?: Order;
  @Prop({ type: Types.ObjectId, ref: User.name })
  creator?: User;
  @Prop({ type: Types.ObjectId, ref: User.name })
  updator?: User;
  // @Prop()
  // number?: string;
  @Prop({ type: Types.ObjectId, ref: 'Transporter' })
  transporter?: 'Transporter';
  @Prop({ type: () => TransporterTtnDto })
  ttn?: TransporterTtnDto;
  // @Prop({ default: 'new' })
  // status?: 'new' | 'inWork' | 'shipped' | 'awaiting' | 'delivered' | 'received';

  // @Prop()
  // contentTotalValue?: number;

  // @Prop()
  // content?: ShipmentContent[];
}

export const ShipmentModel = SchemaFactory.createForClass(Shipment);
