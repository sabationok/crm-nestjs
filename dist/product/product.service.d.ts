import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { ProductModel } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: ModelType<ProductModel>);
    getHello(): Promise<string>;
    findAll(): Promise<DocumentType<any>>;
    create(dto: CreateProductDto): Promise<DocumentType<ProductModel>>;
    delete(id: string): Promise<DocumentType<ProductModel> | null>;
    updateById(id: string, dto: CreateProductDto): Promise<DocumentType<ProductModel> | null>;
    findByProductId(id: string): Promise<DocumentType<ProductModel>[]>;
}
