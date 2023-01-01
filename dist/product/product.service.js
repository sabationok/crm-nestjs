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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const product_model_1 = require("./product.model");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async getHello() {
        return 'Hello!';
    }
    async findAll() {
        return this.productModel.find().exec();
    }
    async create(dto) {
        return this.productModel.create(dto);
    }
    async delete(id) {
        return this.productModel.findByIdAndDelete(id).exec();
    }
    async updateById(id, dto) {
        return this.productModel.findByIdAndUpdate(id, dto).exec();
    }
    async findByProductId(id) {
        return this.productModel.find({ _id: id }).exec();
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(product_model_1.ProductModel)),
    __metadata("design:paramtypes", [Object])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map