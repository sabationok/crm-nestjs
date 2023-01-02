import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CategoryModel } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dt';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: ModelType<CategoryModel>);
    getHello(): Promise<string>;
    findAll(): Promise<DocumentType<any>>;
    findById(id: string): Promise<DocumentType<CategoryModel> | null>;
    findByOwnerId(id: string): Promise<DocumentType<CategoryModel>[]>;
    create(dto: CreateCategoryDto): Promise<DocumentType<CategoryModel>>;
    delete(id: string): Promise<DocumentType<CategoryModel> | null>;
    deleteManyByParentId(id: string): Promise<DocumentType<any>>;
    updateById(id: string, dto: CreateCategoryDto): Promise<DocumentType<CategoryModel> | null>;
}
