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
exports.OrderModel = exports.IPaymentinfo = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class IPaymentinfo {
}
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", String)
], IPaymentinfo.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", String)
], IPaymentinfo.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], IPaymentinfo.prototype, "blockedFunds", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], IPaymentinfo.prototype, "total", void 0);
exports.IPaymentinfo = IPaymentinfo;
class OrderModel extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", String)
], OrderModel.prototype, "number", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'standart' }),
    __metadata("design:type", String)
], OrderModel.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'new' }),
    __metadata("design:type", String)
], OrderModel.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Object)
], OrderModel.prototype, "managerId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: { IPaymentinfo }, _id: false }),
    __metadata("design:type", IPaymentinfo)
], OrderModel.prototype, "payment", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Array)
], OrderModel.prototype, "content", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Array)
], OrderModel.prototype, "deliveries", void 0);
exports.OrderModel = OrderModel;
//# sourceMappingURL=order.model.js.map