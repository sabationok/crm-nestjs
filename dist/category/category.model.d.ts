import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongoose';
export interface CategoryModel extends Base {
}
export declare class CategoryModel extends TimeStamps {
    name: string;
    owner: ObjectId;
    ownerName: string;
    section?: ObjectId;
    sectionName?: string;
    isSection?: boolean;
    isArchived?: boolean;
}
