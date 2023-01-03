import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<ProductDocument>);
    findAll(): Promise<Product[]>;
    create(dto: CreateProductDto): Promise<Product>;
    delete(id: string): Promise<Product | null>;
    updateById(id: string, dto: CreateProductDto): Promise<Product | null>;
    findByProductId(id: string): Promise<Product[]>;
}
