import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

// export class IPaymentinfo {
//   @IsString()
//   type?: string;

//   @IsString()
//   @ValidateNested()
//   status?: 'pending' | 'success' | 'rejected';
// }

// export class OrderItem {
//   @IsObject()
//   _id?: Types.ObjectId;

//   @IsString()
//   atribute_1?: string;

//   @IsString()
//   atribute_2?: string;

//   @IsNumber()
//   price?: number;

//   @IsNumber()
//   quantity?: number;

//   @IsNumber()
//   total?: number;
// }

// export class Receiver {
//   @IsString()
//   @IsOptional()
//   _id?: Types.ObjectId;

//   @IsString()
//   @IsOptional()
//   name?: string;

//   @IsString()
//   @IsOptional()
//   phone?: string;

//   @IsString()
//   @IsOptional()
//   destination?: string;
// }

// export class CreateOrderDto {
//   @IsString()
//   @IsOptional()
//   number?: string;

//   @IsString()
//   @IsOptional()
//   type?: string;

//   @IsString()
//   @IsOptional()
//   status?: string;

//   @IsObject()
//   @IsOptional()
//   payment?: IPaymentinfo;

//   @IsArray({ each: true })
//   @IsOptional()
//   @ValidateNested()
//   content?: OrderItem[];

//   @IsArray({ each: true })
//   @IsOptional()
//   shipments?: Types.ObjectId[];

//   @IsObject()
//   @IsOptional()
//   @ValidateNested()
//   receiver?: Receiver;

//   @IsString()
//   @IsOptional()
//   receivingType?: string;
// }

export class IPaymentinfo {
  type?: 'iban' | 'card' | 'iban_bonuses' | 'card_bonuses';

  status?: 'pending' | 'success' | 'rejected' | 'modified';

  blockedFunds?: number;

  total?: number;
}

export class OrderItemComponent {
  _id?: Types.ObjectId;

  atribute_1?: string;

  atribute_2?: string;

  quantity?: number;

  price?: number;

  total?: number;

  saleSumm?: number;
}

export class OrderItem {
  _id?: Types.ObjectId;

  imgUrl?: string;

  name?: string;

  sku?: string;

  totalPrice?: number;

  ttn?: string;

  ttnCost?: number;

  components?: OrderItemComponent[];
}

export class CreateOrderDto {
  // number?: string;

  // creator: Types.ObjectId;

  // updator: Types.ObjectId;

  type?: 'standart' | 'mix';

  status?: 'new' | 'inWork' | 'success' | 'rejected' | 'canceled' | 'archived';

  managerId?: Types.ObjectId;

  payment?: IPaymentinfo;

  contentIdArr?: Types.ObjectId[];

  content?: OrderItem[];

  totalPrice?: number;

  totalDeliveriesCount?: number;

  shipments?: Types.ObjectId[];
}
