import { ObjectId } from 'mongoose';
export declare class CreateCategoryDto {
    name: string;
    owner?: ObjectId;
    ownerName?: string;
    isSection?: boolean;
}
