import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    findAll(): Promise<Category[]>;
    findById(id: string): Promise<Category | null>;
    findByOwnerId(id: string): Promise<Category[]>;
    create(dto: CreateCategoryDto): Promise<Category>;
    delete(id: string): Promise<Category | null>;
    deleteManyByParentId(id: string): Promise<object | any>;
    updateById(id: string, dto: CreateCategoryDto): Promise<Category | null>;
}
