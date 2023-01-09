import { Types } from 'mongoose';
export declare class FindUserDto {
    _id?: Types.ObjectId;
    createdAt?: string;
    passwordHash?: string | undefined;
    updatedAt?: string;
    access_token?: string;
    email?: string;
    role?: string;
}
