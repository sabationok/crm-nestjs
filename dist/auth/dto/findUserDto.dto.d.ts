import { Types } from 'mongoose';
export declare class FindUserDto {
    email?: string;
    login?: string;
    role?: string;
    _id?: Types.ObjectId;
    access_token?: string;
}
