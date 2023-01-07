import { Types } from 'mongoose';
export declare class CreateCategoryDto {
    name: string;
    owner?: Types.ObjectId;
    ownerName?: string;
    section?: Types.ObjectId;
    sectionName?: string;
    isSection?: boolean;
    isArchived?: boolean;
}
