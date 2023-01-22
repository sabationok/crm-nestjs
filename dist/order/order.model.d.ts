import { Types, Document } from 'mongoose';
import { User } from 'src/auth/user.model';
import { Shipment } from 'src/shipments/shipment.model';
export declare type OrderDocument = Order & Document;
export declare class IPaymentinfo {
    type?: 'iban' | 'card' | 'iban_bonuses' | 'card_bonuses' | 'forFree';
    status?: 'pending' | 'success' | 'rejected' | 'modified';
    blockedFunds?: number;
    total?: number;
}
export declare class OrderItemComponent {
    _id?: Types.ObjectId;
    sku?: string;
    atribute_1?: string;
    atribute_2?: string;
    quantity?: number;
    price?: number;
    total?: number;
}
export declare class OrderItem {
    _id?: Types.ObjectId;
    quantity?: number;
    price?: number;
    sale?: number;
    total?: number;
    shipment?: Types.ObjectId;
    components?: OrderItemComponent[];
}
export declare class Order {
    number?: string;
    creator?: User;
    type?: 'standart' | 'mix';
    status?: 'new' | 'inWork' | 'success' | 'rejected' | 'archived';
    payment?: IPaymentinfo;
    contentIdArr?: Types.ObjectId[];
    content?: OrderItem[];
    totalValue?: number;
    totalShipmentsCount?: number;
    shipments?: Shipment[];
}
export declare const testOrder = "test =======================================================";
export declare const OrderModel: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any>, any, any>;
