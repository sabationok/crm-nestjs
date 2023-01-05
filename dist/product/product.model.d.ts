import { HydratedDocument, ObjectId } from 'mongoose';
export declare type ProductDocument = HydratedDocument<Product>;
export declare class ProductPriceInfo {
    price?: number;
    cost?: number;
    currency?: string;
    sale?: number;
    isCommission?: boolean;
}
export declare class SectionInfo {
    _id?: ObjectId;
    name?: string;
}
export declare class CategoryInfo {
    ownerId?: ObjectId;
    owner?: string;
    _id?: ObjectId;
    name?: string;
}
export declare class ProductCategoryInfo {
    section?: SectionInfo;
    category?: CategoryInfo;
}
export declare class ProductAvailabilityInfo {
    availability?: 'available' | 'notAvailable' | 'awaiting';
    standartOrder?: boolean;
    standartOrderTime?: number;
    specialOrder?: boolean;
    specialOrderTime?: number;
}
export declare class Product {
    isApproved?: boolean;
    isVisible?: boolean;
    sku?: string;
    name?: string;
    brand?: string;
    priceInfo?: ProductPriceInfo;
    categoryInfo?: ProductCategoryInfo;
    availabilityInfo?: ProductAvailabilityInfo;
    description?: string;
    innerComment?: string;
    images?: string[];
}
export declare const ProductModel: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any>, any, any>;
