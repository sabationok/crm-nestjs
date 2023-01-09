import { Types } from 'mongoose';
export declare class UpdateUserDto {
    _id?: Types.ObjectId;
    createdAt?: string;
    passwordHash?: string | undefined;
    updatedAt?: string;
    access_token?: string;
    email?: string;
    role?: string;
}
