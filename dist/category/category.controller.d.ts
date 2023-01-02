import { HttpStatus } from '@nestjs/common';
import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryServise;
    constructor(categoryServise: CategoryService);
    getAll(user: any): Promise<{
        status: HttpStatus;
        data: any;
        messsage: string;
    }>;
    getByParentId(id: string): Promise<{
        status: HttpStatus;
        data: import("@typegoose/typegoose").DocumentType<CategoryModel, import("@typegoose/typegoose/lib/types").BeAnObject>[];
        messsage: string;
    }>;
    getById(id: string, user: any): Promise<{
        user: any;
        status: HttpStatus;
        data: import("@typegoose/typegoose").DocumentType<CategoryModel, import("@typegoose/typegoose/lib/types").BeAnObject>;
        messsage: string;
    }>;
    create(dto: CategoryModel, req: any): Promise<{
        status: HttpStatus;
        data: import("@typegoose/typegoose").DocumentType<CategoryModel, import("@typegoose/typegoose/lib/types").BeAnObject>;
        messsage: string;
    }>;
    update(id: string, dto: CategoryModel, req: any): Promise<{
        status: HttpStatus;
        data: import("@typegoose/typegoose").DocumentType<CategoryModel, import("@typegoose/typegoose/lib/types").BeAnObject> | null;
        messsage: string;
    }>;
    deleteById(id: string, req: any): Promise<{
        status: HttpStatus;
        data: import("@typegoose/typegoose").DocumentType<CategoryModel, import("@typegoose/typegoose/lib/types").BeAnObject>;
        messsage: string;
    }>;
    clearById(id: string, req: any): Promise<{
        status: HttpStatus;
        data: any;
        messsage: string;
    }>;
}
