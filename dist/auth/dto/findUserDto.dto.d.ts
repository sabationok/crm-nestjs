import { Types } from 'mongoose';
export declare class FindUserDto {
    userId?: Types.ObjectId;
    email?: string;
    login?: string;
    role?: string;
}
