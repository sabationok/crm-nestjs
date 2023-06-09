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
const user_model_1 = require("../auth/user.model");
const product_model_1 = require("../product/product.model");
const shipment_model_1 = require("../shipments/shipment.model");
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
    (0, mongoose_1.Schema)({ _id: false, timestamps: false, versionKey: false })
], IPaymentinfo);
exports.IPaymentinfo = IPaymentinfo;
let OrderItemComponent = class OrderItemComponent {
};
__decorate([
    (0, mongoose_1.Prop)({ default: null, ref: 'Products', type: () => [mongoose_2.Types.ObjectId] }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OrderItemComponent.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], OrderItemComponent.prototype, "sku", void 0);
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
], OrderItemComponent.prototype, "total", void 0);
OrderItemComponent = __decorate([
    (0, mongoose_1.Schema)({ _id: false, timestamps: false, versionKey: false })
], OrderItemComponent);
exports.OrderItemComponent = OrderItemComponent;
let OrderItem = class OrderItem {
};
__decorate([
    (0, mongoose_1.Prop)({ default: null, ref: product_model_1.Product.name, type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", product_model_1.Product)
], OrderItem.prototype, "itemInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "total", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: mongoose_2.Types.ObjectId, ref: shipment_model_1.Shipment.name }),
    __metadata("design:type", shipment_model_1.Shipment)
], OrderItem.prototype, "shipment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: { OrderItemComponent } }),
    __metadata("design:type", Array)
], OrderItem.prototype, "components", void 0);
OrderItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false, timestamps: false, versionKey: false })
], OrderItem);
exports.OrderItem = OrderItem;
let Order = class Order {
};
__decorate([
    (0, mongoose_1.Prop)({ default: '000000000000', unique: false }),
    __metadata("design:type", String)
], Order.prototype, "number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'new' }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_model_1.User.name }),
    __metadata("design:type", user_model_1.User)
], Order.prototype, "managerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: product_model_1.Product.name }] }),
    __metadata("design:type", Array)
], Order.prototype, "contentIdArr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: product_model_1.Product.name }] }),
    __metadata("design:type", Array)
], Order.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: shipment_model_1.Shipment.name }] }),
    __metadata("design:type", Array)
], Order.prototype, "shipments", void 0);
Order = __decorate([
    (0, mongoose_1.Schema)({ _id: true, timestamps: true, versionKey: false })
], Order);
exports.Order = Order;
exports.OrderModel = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.model.js.map