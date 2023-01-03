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
exports.OrderModel = exports.Order = exports.Product = exports.IPaymentinfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let IPaymentinfo = class IPaymentinfo {
};
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], IPaymentinfo.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], IPaymentinfo.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], IPaymentinfo.prototype, "blockedFunds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], IPaymentinfo.prototype, "total", void 0);
IPaymentinfo = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], IPaymentinfo);
exports.IPaymentinfo = IPaymentinfo;
let Product = class Product {
};
Product = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Product);
exports.Product = Product;
let Order = class Order {
};
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], Order.prototype, "number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'standart' }),
    __metadata("design:type", String)
], Order.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'new' }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => Object }),
    __metadata("design:type", Object)
], Order.prototype, "managerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: { IPaymentinfo }, _id: false }),
    __metadata("design:type", IPaymentinfo)
], Order.prototype, "payment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Array)
], Order.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Array)
], Order.prototype, "deliveries", void 0);
Order = __decorate([
    (0, mongoose_1.Schema)({ _id: true, timestamps: true, versionKey: false })
], Order);
exports.Order = Order;
exports.OrderModel = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.model.js.map