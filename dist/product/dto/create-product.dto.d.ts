import { ObjectId, Types } from 'mongoose';
export interface IProductPriceInfo {
    price?: number;
    cost?: number;
    currency?: string;
    sale?: number;
    isCommission?: boolean;
    cashbackId?: number;
}
export interface ICategory {
    _id: ObjectId;
    category: string;
    owner?: string;
    ownerName?: Types.ObjectId;
    section?: string;
    sectionName?: Types.ObjectId;
}
export interface IProductAvailabilityInfo {
    availability: 'available' | 'notAvailable' | 'awaiting';
    standartOrder?: boolean;
    standartOrderTime?: number;
    specialOrder?: boolean;
    specialOrderTime?: number;
}
export declare class CreateProductDto {
    approvedStatus?: 'success' | 'pending' | 'reject';
    visibilityStatus?: boolean;
    sku?: string;
    name?: string;
    brand?: string;
    priceInfo?: IProductPriceInfo;
    categoryId?: Types.ObjectId;
    availabilityInfo?: IProductAvailabilityInfo;
    description?: string;
    innerComment?: string;
    images?: string[];
}
