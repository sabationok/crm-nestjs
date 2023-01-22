import { HydratedDocument, Types } from 'mongoose';
export declare type UserDocument = HydratedDocument<User>;
export declare type TUserRoles = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'TOP_MANAGER' | 'VENDOR' | 'SUPLYER_MANAGER' | 'CUSTOMER' | 'GUEST';
export declare type TUserStatus = 'ACTIVE' | 'NOT_ACTIVE' | 'BAN';
export declare class Manager {
    vendors?: Types.ObjectId[];
}
export declare class Vendor {
    managerId?: Types.ObjectId;
    managerCode?: string;
}
export declare class User {
    email: string;
    passwordHash: string;
    login?: string;
    name?: string;
    phone?: string;
    role?: TUserRoles;
    status?: TUserStatus;
    manager?: Manager;
    vendor?: Vendor;
    access_token?: string;
}
export declare class FindUser extends User {
    _id?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const UserModel: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any>, any, any>;
