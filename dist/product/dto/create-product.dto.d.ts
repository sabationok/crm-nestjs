import { ObjectId } from 'mongoose';
export interface IProductPriceInfo {
    price?: number;
    cost?: number;
    currency?: string;
    sale?: number;
    isCommission?: boolean;
}
export interface Section {
    id: ObjectId;
    name: string;
}
export interface Category {
    ownerName?: ObjectId;
    owner?: string;
    id: ObjectId;
    name: string;
}
export interface IProductCategoryInfo {
    section: Section;
    category: Category;
}
export interface IProductAvailabilityInfo {
    availability: 'available' | 'notAvailable' | 'awaiting';
    standartOrder?: boolean;
    standartOrderTime?: number;
    specialOrder?: boolean;
    specialOrderTime?: number;
}
export declare class CreateProductDto {
    isApproved?: boolean;
    isVisible?: boolean;
    sku?: string;
    name?: string;
    brand?: string;
    priceInfo?: IProductPriceInfo;
    categoryInfo?: IProductCategoryInfo;
    availabilityInfo?: IProductAvailabilityInfo;
    description?: string;
    innerComment?: string;
    images?: string[];
}
