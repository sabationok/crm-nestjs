import { ObjectId } from 'mongoose';
export declare class CreateCategoryDto {
    name: string;
    owner?: ObjectId;
    ownerName?: string;
    section?: ObjectId;
    sectionName?: string;
    isSection?: boolean;
    isArchived?: boolean;
}
