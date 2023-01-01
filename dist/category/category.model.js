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
exports.CategoryModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class CategoryModel extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.prop)({ default: 'categoryName' }),
    __metadata("design:type", String)
], CategoryModel.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'parentId' }),
    __metadata("design:type", Object)
], CategoryModel.prototype, "owner", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'parentName' }),
    __metadata("design:type", String)
], CategoryModel.prototype, "ownerName", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], CategoryModel.prototype, "isSection", void 0);
exports.CategoryModel = CategoryModel;
//# sourceMappingURL=category.model.js.map