import { HydratedDocument, ObjectId } from 'mongoose';
export declare type UserDocument = HydratedDocument<User>;
export declare type TUserRoles = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'TOP_MANAGER' | 'VENDOR' | 'SUPLYER_MANAGER' | 'CUSTOMER' | 'GUEST';
export declare type TUserStatus = 'ACTIVE' | 'NOT_ACTIVE' | 'BAN';
export declare class User {
    email: string;
    passwordHash: string;
    name: string;
    phone: string;
    role: TUserRoles;
    status: TUserStatus;
    manager?: ObjectId;
    vendors?: string[];
}
export declare const UserModel: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any>, any, any>;
