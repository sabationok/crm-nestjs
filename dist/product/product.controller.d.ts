import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(user: string): Promise<import("./product.model").Product[]>;
    getAllforAll(req: any): Promise<import("./product.model").Product[]>;
    create(dto: CreateProductDto, req: any): Promise<import("./product.model").Product>;
    getBiId(id: string): Promise<import("./product.model").Product[]>;
    delete(id: string): Promise<void>;
    patch(id: string, dto: CreateProductDto): Promise<import("./product.model").Product>;
    find(dto: CreateProductDto): Promise<void>;
}
