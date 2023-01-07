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
exports.OrderModel = exports.Order = exports.OrderItem = exports.OrderItemComponent = exports.IPaymentinfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let IPaymentinfo = class IPaymentinfo {
};
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], IPaymentinfo.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending' }),
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
let OrderItemComponent = class OrderItemComponent {
};
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: () => [mongoose_2.Types.ObjectId] }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OrderItemComponent.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], OrderItemComponent.prototype, "atribute_1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], OrderItemComponent.prototype, "atribute_2", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrderItemComponent.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrderItemComponent.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrderItemComponent.prototype, "sale", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrderItemComponent.prototype, "summ", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrderItemComponent.prototype, "saleSumm", void 0);
OrderItemComponent = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], OrderItemComponent);
exports.OrderItemComponent = OrderItemComponent;
let OrderItem = class OrderItem {
};
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: () => [mongoose_2.Types.ObjectId] }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OrderItem.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], OrderItem.prototype, "imgUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], OrderItem.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], OrderItem.prototype, "sku", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "totalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], OrderItem.prototype, "ttn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "ttnCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: { OrderItemComponent } }),
    __metadata("design:type", Array)
], OrderItem.prototype, "components", void 0);
OrderItem = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], OrderItem);
exports.OrderItem = OrderItem;
let Order = class Order {
};
__decorate([
    (0, mongoose_1.Prop)({ default: null, unique: false }),
    __metadata("design:type", String)
], Order.prototype, "number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: () => mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Order.prototype, "creator", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: () => mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Order.prototype, "updator", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'standart' }),
    __metadata("design:type", String)
], Order.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'new' }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Order.prototype, "managerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: { IPaymentinfo }, _id: false }),
    __metadata("design:type", IPaymentinfo)
], Order.prototype, "payment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [], type: () => [mongoose_2.Types.ObjectId] }),
    __metadata("design:type", Array)
], Order.prototype, "contentIdArr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [], type: () => [OrderItem] }),
    __metadata("design:type", Array)
], Order.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalDeliveriesCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [], type: () => [Object] }),
    __metadata("design:type", Array)
], Order.prototype, "deliveries", void 0);
Order = __decorate([
    (0, mongoose_1.Schema)({ _id: true, timestamps: true, versionKey: false })
], Order);
exports.Order = Order;
exports.OrderModel = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.model.js.map