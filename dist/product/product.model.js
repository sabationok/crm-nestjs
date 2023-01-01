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
exports.ProductModel = exports.ProductAvailabilityInfo = exports.ProductCategoryInfo = exports.CategoryInfo = exports.SectionInfo = exports.ProductPriceInfo = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class ProductPriceInfo {
}
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductPriceInfo.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductPriceInfo.prototype, "cost", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'UAH' }),
    __metadata("design:type", String)
], ProductPriceInfo.prototype, "currency", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductPriceInfo.prototype, "sale", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], ProductPriceInfo.prototype, "isCommission", void 0);
exports.ProductPriceInfo = ProductPriceInfo;
class SectionInfo {
}
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], SectionInfo.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '000' }),
    __metadata("design:type", String)
], SectionInfo.prototype, "name", void 0);
exports.SectionInfo = SectionInfo;
class CategoryInfo {
}
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], CategoryInfo.prototype, "ownerId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '000' }),
    __metadata("design:type", String)
], CategoryInfo.prototype, "owner", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Object)
], CategoryInfo.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '000' }),
    __metadata("design:type", String)
], CategoryInfo.prototype, "name", void 0);
exports.CategoryInfo = CategoryInfo;
class ProductCategoryInfo {
}
__decorate([
    (0, typegoose_1.prop)({ default: { SectionInfo }, _id: false }),
    __metadata("design:type", SectionInfo)
], ProductCategoryInfo.prototype, "section", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: { CategoryInfo }, _id: false }),
    __metadata("design:type", CategoryInfo)
], ProductCategoryInfo.prototype, "category", void 0);
exports.ProductCategoryInfo = ProductCategoryInfo;
class ProductAvailabilityInfo {
}
__decorate([
    (0, typegoose_1.prop)({ default: 'notAvailable' }),
    __metadata("design:type", String)
], ProductAvailabilityInfo.prototype, "availability", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], ProductAvailabilityInfo.prototype, "standartOrder", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductAvailabilityInfo.prototype, "standartOrderTime", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], ProductAvailabilityInfo.prototype, "specialOrder", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductAvailabilityInfo.prototype, "specialOrderTime", void 0);
exports.ProductAvailabilityInfo = ProductAvailabilityInfo;
class ProductModel extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], ProductModel.prototype, "isApproved", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], ProductModel.prototype, "isVisible", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", String)
], ProductModel.prototype, "sku", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'Назва товару' }),
    __metadata("design:type", String)
], ProductModel.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'Назва бренду' }),
    __metadata("design:type", String)
], ProductModel.prototype, "brand", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: { ProductPriceInfo }, _id: false }),
    __metadata("design:type", ProductPriceInfo)
], ProductModel.prototype, "priceInfo", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: { ProductCategoryInfo }, _id: false }),
    __metadata("design:type", ProductCategoryInfo)
], ProductModel.prototype, "categoryInfo", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: { ProductAvailabilityInfo }, _id: false }),
    __metadata("design:type", ProductAvailabilityInfo)
], ProductModel.prototype, "availabilityInfo", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", String)
], ProductModel.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", String)
], ProductModel.prototype, "innerComment", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], ProductModel.prototype, "images", void 0);
exports.ProductModel = ProductModel;
//# sourceMappingURL=product.model.js.map