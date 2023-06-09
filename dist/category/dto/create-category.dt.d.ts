import { Types } from 'mongoose';
export declare class CreateCategoryDto {
    label: string;
    name: string;
    description: string;
    owner?: Types.ObjectId;
    isArchived?: boolean;
}
