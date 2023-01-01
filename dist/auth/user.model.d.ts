import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from 'mongoose';
export declare type TUserRoles = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'TOP_MANAGER' | 'VENDOR' | 'VENDOR_MANAGER' | 'USER' | 'GUEST';
export declare type TUserStatus = 'ACTIVE' | 'NOT_ACTIVE' | 'BAN';
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    email: string;
    passwordHash: string;
    name: string;
    phone: string;
    role: TUserRoles;
    status: TUserStatus;
    manager: ObjectId;
    vendors: string[];
}
