import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongoose';
export declare class ProductPriceInfo {
    price?: number;
    cost?: number;
    currency?: string;
    sale?: number;
    isCommission?: boolean;
}
export declare class SectionInfo {
    id: ObjectId;
    name: string;
}
export declare class CategoryInfo {
    ownerId: ObjectId;
    owner: string;
    id: ObjectId;
    name: string;
}
export declare class ProductCategoryInfo {
    section: SectionInfo;
    category: CategoryInfo;
}
export declare class ProductAvailabilityInfo {
    availability: 'available' | 'notAvailable' | 'awaiting';
    standartOrder?: boolean;
    standartOrderTime?: number;
    specialOrder?: boolean;
    specialOrderTime?: number;
}
export interface ProductModel extends Base {
}
export declare class ProductModel extends TimeStamps {
    isApproved: boolean;
    isVisible: boolean;
    sku: string;
    name: string;
    brand: string;
    priceInfo: ProductPriceInfo;
    categoryInfo: ProductCategoryInfo;
    availabilityInfo: ProductAvailabilityInfo;
    description: string;
    innerComment: string;
    images: string[];
}
