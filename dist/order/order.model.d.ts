import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongoose';
export declare class IPaymentinfo {
    type: 'iban' | 'card' | 'iban_bonuses' | 'card_bonuses';
    status: 'pending' | 'success' | 'rejected';
    blockedFunds: number;
    total: number;
}
export interface OrderModel extends Base {
}
export declare class OrderModel extends TimeStamps {
    number: string;
    type: 'standart' | 'complex';
    status: 'new' | 'inWork' | 'success' | 'rejected' | 'canceled' | 'archived';
    managerId: ObjectId;
    payment: IPaymentinfo;
    content: ObjectId[];
    deliveries: ObjectId[];
}
