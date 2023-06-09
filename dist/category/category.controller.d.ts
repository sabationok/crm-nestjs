import { HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { TelegramService } from 'src/telegram/telegram.service';
export declare class CategoryController {
    private readonly categoryService;
    private readonly telegramService;
    constructor(categoryService: CategoryService, telegramService: TelegramService);
    getAll(user: any): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./category.model").Category[];
    }>;
    getByParentId(id: string): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./category.model").Category[];
    }>;
    getById(id: string, user: any): Promise<{
        user: any;
        status: HttpStatus;
        message: string;
        data: import("./category.model").Category;
    }>;
    create(dto: CreateCategoryDto, req: any): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./category.model").Category;
    }>;
    update(id: string, dto: CreateCategoryDto, req: any): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./category.model").Category | null;
    }>;
    deleteById(id: string, req: any): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./category.model").Category;
    }>;
    clearById(id: string, req: any): Promise<{
        status: HttpStatus;
        message: string;
        data: any;
    }>;
}
