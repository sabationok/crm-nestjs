import { ProductModel } from './product.model';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(user: string): Promise<any>;
    getAllforAll(req: any): Promise<any>;
    create(dto: ProductModel, req: any): Promise<import("@typegoose/typegoose").DocumentType<ProductModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    getBiId(id: string): Promise<import("@typegoose/typegoose").DocumentType<ProductModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    delete(id: string): Promise<void>;
    patch(id: string, dto: ProductModel): Promise<import("@typegoose/typegoose").DocumentType<ProductModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    find(dto: ProductModel): Promise<void>;
}
