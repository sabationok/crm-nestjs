import { HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dt';
export declare class CategoryController {
    private readonly categoryServise;
    constructor(categoryServise: CategoryService);
    getAll(user: any): Promise<{
        status: HttpStatus;
        data: import("./category.model").Category[];
        messsage: string;
    }>;
    getByParentId(id: string): Promise<{
        status: HttpStatus;
        data: import("./category.model").Category[];
        messsage: string;
    }>;
    getById(id: string, user: any): Promise<{
        user: any;
        status: HttpStatus;
        data: import("./category.model").Category;
        messsage: string;
    }>;
    create(dto: CreateCategoryDto, req: any): Promise<{
        status: HttpStatus;
        data: import("./category.model").Category;
        messsage: string;
    }>;
    update(id: string, dto: CreateCategoryDto, req: any): Promise<{
        status: HttpStatus;
        data: import("./category.model").Category | null;
        messsage: string;
    }>;
    deleteById(id: string, req: any): Promise<{
        status: HttpStatus;
        data: import("./category.model").Category;
        messsage: string;
    }>;
    clearById(id: string, req: any): Promise<{
        status: HttpStatus;
        data: any;
        messsage: string;
    }>;
}
