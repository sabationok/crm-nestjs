"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const request_decorator_1 = require("../decorators/request.decorator");
const getUser_decorator_1 = require("../decorators/getUser.decorator");
const jwt_guards_1 = require("../guards/jwt.guards");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const auth_service_1 = require("../auth/auth.service");
const user_model_1 = require("../auth/user.model");
const update_product_dto_1 = require("./dto/update-product.dto");
let ProductController = class ProductController {
    constructor(productService, authService) {
        this.productService = productService;
        this.authService = authService;
    }
    async getAll(user) {
        const products = await this.productService.findAll();
        if (!products) {
            throw new common_1.HttpException('Not found any products', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: common_1.HttpStatus.OK,
            message: 'Found products',
            data: products,
        };
    }
    async getAllforAll(req) {
        return this.productService.findAll();
    }
    async getBiId({ id }) {
        const product = await this.productService.findByProductId(id);
        if (!product) {
            throw new common_1.HttpException('Not found product', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: common_1.HttpStatus.OK,
            message: 'Found product',
            data: product,
        };
    }
    async delete(id) {
        const deletedDoc = await this.productService.delete(id);
        if (!deletedDoc) {
            throw new common_1.HttpException('Not product for deleting', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: common_1.HttpStatus.OK,
            message: 'Deleting success',
            data: deletedDoc,
        };
    }
    async create(dto, user) {
        try {
            const creator = await this.authService.getUserById(user._id);
            const newProduct = Object.assign({ creator: {
                    _id: user._id,
                    role: user.role,
                    name: creator === null || creator === void 0 ? void 0 : creator.name,
                } }, dto);
            common_1.Logger.log(creator === null || creator === void 0 ? void 0 : creator.email);
            const createdProduct = await this.productService.create(newProduct);
            if (!createdProduct) {
                throw new common_1.HttpException('Помилка при створенні продукту', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Створено новий продукт',
                data: createdProduct,
            };
        }
        catch (error) {
            common_1.Logger.log(error);
            throw new common_1.HttpException('Помилка бази даних', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async patch(productId, dto, user) {
        const creator = await this.authService.getUserById(user._id);
        const updateProductData = Object.assign({ updator: {
                _id: user._id,
                user: creator === null || creator === void 0 ? void 0 : creator.role,
                name: creator === null || creator === void 0 ? void 0 : creator.name,
            } }, dto);
        const updatedDoc = await this.productService.updateById(productId, updateProductData);
        if (!updatedDoc) {
            throw new common_1.HttpException('Продукт для оновлення, відсутній', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: common_1.HttpStatus.OK,
            message: `Оновлено "${productId}"`,
            data: updatedDoc,
            updateProductData,
        };
    }
    async find(dto) { }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Get)('getAll'),
    __param(0, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('getAllforAll'),
    __param(0, (0, request_decorator_1.UserRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllforAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getBiId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Patch)('update/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "patch", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('find'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "find", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        auth_service_1.AuthService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map