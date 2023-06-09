/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Types, Document } from 'mongoose';
import { User } from 'src/auth/user.model';
import { Product } from 'src/product/product.model';
import { Shipment } from 'src/shipments/shipment.model';
export type OrderDocument = Order & Document;
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
    itemInfo?: Product;
    quantity?: number;
    price?: number;
    total?: number;
    shipment?: Shipment;
    components?: OrderItemComponent[];
}
export declare class Order {
    number?: string;
    status?: 'new' | 'inWork' | 'success' | 'rejected' | 'archived';
    managerId?: User;
    contentIdArr?: OrderItem[];
    content?: OrderItem[];
    shipments?: Shipment[];
}
export declare const OrderModel: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order>;
