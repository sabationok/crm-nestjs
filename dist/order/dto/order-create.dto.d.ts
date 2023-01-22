import { Types } from 'mongoose';
export declare class IPaymentinfo {
    type?: 'iban' | 'card' | 'iban_bonuses' | 'card_bonuses';
    status?: 'pending' | 'success' | 'rejected' | 'modified';
    blockedFunds?: number;
    total?: number;
}
export declare class OrderItemComponent {
    _id?: Types.ObjectId;
    atribute_1?: string;
    atribute_2?: string;
    quantity?: number;
    price?: number;
    total?: number;
    saleSumm?: number;
}
export declare class OrderItem {
    _id?: Types.ObjectId;
    imgUrl?: string;
    name?: string;
    sku?: string;
    totalPrice?: number;
    ttn?: string;
    ttnCost?: number;
    components?: OrderItemComponent[];
}
export declare class CreateOrderDto {
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
