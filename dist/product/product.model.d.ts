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
import { HydratedDocument, Types } from 'mongoose';
export type ProductDocument = HydratedDocument<Product>;
export declare class ProductPriceInfo {
    price?: number;
    cost?: number;
    currency?: string;
    sale?: number;
    isCommission?: boolean;
}
export declare class CategoryInfo {
    sectionName?: string;
    section?: Types.ObjectId;
    owner?: Types.ObjectId;
    ownerName?: string;
    _id?: Types.ObjectId;
    category?: string;
}
export declare class ProductAvailabilityInfo {
    availability?: 'available' | 'notAvailable' | 'awaiting';
    standartOrder?: boolean;
    standartOrderTime?: number;
    specialOrder?: boolean;
    specialOrderTime?: number;
}
export declare class Author {
    _id?: Types.ObjectId;
    role?: string;
    name?: string;
}
export declare class Product {
    approvedStatus?: 'success' | 'pending' | 'reject';
    visibilityStatus?: boolean;
    sku?: string;
    name?: string;
    brand?: string;
    creator: Author;
    updator?: Author;
    priceInfo?: ProductPriceInfo;
    categoryId: Types.ObjectId;
    availabilityInfo?: ProductAvailabilityInfo;
    description?: string;
    innerComment?: string;
    images?: string[];
}
export declare const ProductModel: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product>;
