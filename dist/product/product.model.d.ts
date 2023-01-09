import { HydratedDocument, Types } from 'mongoose';
export declare type ProductDocument = HydratedDocument<Product>;
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
export declare const ProductModel: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any>, any, any>;
