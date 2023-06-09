/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HydratedDocument, Types } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export type TUserRoles = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'TOP_MANAGER' | 'VENDOR' | 'SUPLYER_MANAGER' | 'CUSTOMER' | 'GUEST';
export type UserStatusType = 'ACTIVE' | 'NOT_ACTIVE' | 'BAN';
export declare class Base {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Manager {
    vendors?: Types.ObjectId[];
}
export declare class Vendor {
    manager?: Types.ObjectId;
}
export declare class User {
    email: string;
    passwordHash: string;
    login?: string;
    name?: string;
    phone?: string;
    role?: TUserRoles;
    status?: UserStatusType;
    manager?: Manager;
    vendor?: Vendor;
    access_token?: string;
}
export declare class FindUser extends User {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserModel: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User>;
