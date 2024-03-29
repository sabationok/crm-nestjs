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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.Product = exports.Author = exports.ProductAvailabilityInfo = exports.CategoryInfo = exports.ProductPriceInfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductPriceInfo = class ProductPriceInfo {
};
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductPriceInfo.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductPriceInfo.prototype, "cost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'UAH' }),
    __metadata("design:type", String)
], ProductPriceInfo.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductPriceInfo.prototype, "sale", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ProductPriceInfo.prototype, "isCommission", void 0);
ProductPriceInfo = __decorate([
    (0, mongoose_1.Schema)({ _id: false, versionKey: false })
], ProductPriceInfo);
exports.ProductPriceInfo = ProductPriceInfo;
let CategoryInfo = class CategoryInfo {
};
__decorate([
    (0, mongoose_1.Prop)({ default: '000' }),
    __metadata("design:type", String)
], CategoryInfo.prototype, "sectionName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: () => mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CategoryInfo.prototype, "section", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: () => mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CategoryInfo.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '000' }),
    __metadata("design:type", String)
], CategoryInfo.prototype, "ownerName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: () => mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CategoryInfo.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '000' }),
    __metadata("design:type", String)
], CategoryInfo.prototype, "category", void 0);
CategoryInfo = __decorate([
    (0, mongoose_1.Schema)({ _id: false, versionKey: false })
], CategoryInfo);
exports.CategoryInfo = CategoryInfo;
let ProductAvailabilityInfo = class ProductAvailabilityInfo {
};
__decorate([
    (0, mongoose_1.Prop)({ default: 'notAvailable' }),
    __metadata("design:type", String)
], ProductAvailabilityInfo.prototype, "availability", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ProductAvailabilityInfo.prototype, "standartOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductAvailabilityInfo.prototype, "standartOrderTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ProductAvailabilityInfo.prototype, "specialOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductAvailabilityInfo.prototype, "specialOrderTime", void 0);
ProductAvailabilityInfo = __decorate([
    (0, mongoose_1.Schema)({ _id: false, versionKey: false })
], ProductAvailabilityInfo);
exports.ProductAvailabilityInfo = ProductAvailabilityInfo;
let Author = class Author {
};
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Author.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Author.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Author.prototype, "name", void 0);
Author = __decorate([
    (0, mongoose_1.Schema)({ _id: false, versionKey: false })
], Author);
exports.Author = Author;
let Product = class Product {
};
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending' }),
    __metadata("design:type", String)
], Product.prototype, "approvedStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "visibilityStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Назва товару' }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Назва бренду' }),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: { Author }, type: () => Author }),
    __metadata("design:type", Author)
], Product.prototype, "creator", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: { Author }, type: () => Author }),
    __metadata("design:type", Author)
], Product.prototype, "updator", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: { ProductPriceInfo } }),
    __metadata("design:type", ProductPriceInfo)
], Product.prototype, "priceInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: () => mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: () => ProductAvailabilityInfo,
        type: () => ProductAvailabilityInfo,
    }),
    __metadata("design:type", ProductAvailabilityInfo)
], Product.prototype, "availabilityInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Product.prototype, "innerComment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [], type: () => [String] }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
Product = __decorate([
    (0, mongoose_1.Schema)({ _id: true, timestamps: true, versionKey: false })
], Product);
exports.Product = Product;
exports.ProductModel = mongoose_1.SchemaFactory.createForClass(Product);
//# sourceMappingURL=product.model.js.map