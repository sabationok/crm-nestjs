import { HydratedDocument, ObjectId } from 'mongoose';
export declare type OrderDocument = HydratedDocument<Order>;
export declare class IPaymentinfo {
    type: 'iban' | 'card' | 'iban_bonuses' | 'card_bonuses';
    status: 'pending' | 'success' | 'rejected';
    blockedFunds: number;
    total: number;
}
export declare class Product {
}
export declare class Order {
    number: string;
    type: 'standart' | 'complex';
    status: 'new' | 'inWork' | 'success' | 'rejected' | 'canceled' | 'archived';
    managerId: ObjectId;
    payment: IPaymentinfo;
    content: ObjectId[];
    deliveries: ObjectId[];
}
export declare const OrderModel: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any>, any, any>;
