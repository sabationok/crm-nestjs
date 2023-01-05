import { HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dt';
import { TelegramService } from 'src/telegram/telegram.service';
export declare class CategoryController {
    private readonly categoryServise;
    private readonly telegramService;
    constructor(categoryServise: CategoryService, telegramService: TelegramService);
    getAll(user: any): Promise<{
        status: HttpStatus;
        messsage: string;
        data: import("./category.model").Category[];
        tgRes: import("typegram").Message.TextMessage;
    }>;
    getByParentId(id: string): Promise<{
        status: HttpStatus;
        data: import("./category.model").Category[];
        messsage: string;
    }>;
    getById(id: string, user: any): Promise<{
        user: any;
        status: HttpStatus;
        messsage: string;
        data: import("./category.model").Category;
    }>;
    create(dto: CreateCategoryDto, req: any): Promise<{
        status: HttpStatus;
        messsage: string;
        data: import("./category.model").Category;
    }>;
    update(id: string, dto: CreateCategoryDto, req: any): Promise<{
        status: HttpStatus;
        messsage: string;
        data: import("./category.model").Category | null;
    }>;
    deleteById(id: string, req: any): Promise<{
        status: HttpStatus;
        messsage: string;
        data: import("./category.model").Category;
    }>;
    clearById(id: string, req: any): Promise<{
        status: HttpStatus;
        messsage: string;
        data: any;
    }>;
}
