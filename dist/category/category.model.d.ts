import { HydratedDocument, Types } from 'mongoose';
export declare type CategoryDocument = HydratedDocument<Category>;
export declare class Category {
    name: string;
    owner: Types.ObjectId;
    ownerName: string;
    section?: Types.ObjectId;
    sectionName?: string;
    isSection?: boolean;
    isArchived?: boolean;
}
export declare const CategoryModel: import("mongoose").Schema<Category, import("mongoose").Model<Category, any, any, any>, any, any>;
