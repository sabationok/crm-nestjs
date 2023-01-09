import { HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.model';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    private readonly authService;
    constructor(productService: ProductService, authService: AuthService);
    getAll(user: User): Promise<import("./product.model").Product[]>;
    getAllforAll(req: any): Promise<import("./product.model").Product[]>;
    getBiId(id: string): Promise<import("./product.model").Product[]>;
    delete(id: string): Promise<void>;
    create(dto: CreateProductDto, user: any): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./product.model").Product;
    }>;
    patch(productId: string, dto: UpdateProductDto, user: any): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./product.model").Product;
        updateProductData: {
            approvedStatus?: "success" | "pending" | "reject" | undefined;
            visibilityStatus?: boolean | undefined;
            sku?: string | undefined;
            name?: string | undefined;
            brand?: string | undefined;
            priceInfo?: import("./dto/create-product.dto").IProductPriceInfo | undefined;
            categoryId?: import("mongoose").Types.ObjectId | undefined;
            availabilityInfo?: import("./dto/create-product.dto").IProductAvailabilityInfo | undefined;
            description?: string | undefined;
            innerComment?: string | undefined;
            images?: string[] | undefined;
            updator: {
                _id: any;
                user: import("src/auth/user.model").TUserRoles | undefined;
                name: string | undefined;
            };
        };
    }>;
    find(dto: CreateProductDto): Promise<void>;
}
