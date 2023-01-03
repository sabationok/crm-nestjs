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
exports.CategoryModel = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const typegoose_1 = require("@typegoose/typegoose");
let Category = class Category {
};
__decorate([
    (0, typegoose_1.prop)({ default: 'section' }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'Id' }),
    __metadata("design:type", Object)
], Category.prototype, "owner", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'section' }),
    __metadata("design:type", String)
], Category.prototype, "ownerName", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Object)
], Category.prototype, "section", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Category.prototype, "sectionName", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], Category.prototype, "isSection", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Category.prototype, "isArchived", void 0);
Category = __decorate([
    (0, mongoose_1.Schema)({ _id: true, timestamps: true, versionKey: false })
], Category);
exports.Category = Category;
exports.CategoryModel = mongoose_1.SchemaFactory.createForClass(Category);
//# sourceMappingURL=category.model.js.map