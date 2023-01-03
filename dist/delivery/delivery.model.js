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
exports.DeliveryModel = exports.Delivery = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Delivery = class Delivery {
};
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Delivery.prototype, "number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: () => Object }),
    __metadata("design:type", Object)
], Delivery.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Delivery.prototype, "transporter", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Delivery.prototype, "deliveryPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'new' }),
    __metadata("design:type", String)
], Delivery.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Delivery.prototype, "contentTotalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [], type: () => [Object] }),
    __metadata("design:type", Array)
], Delivery.prototype, "content", void 0);
Delivery = __decorate([
    (0, mongoose_1.Schema)({ _id: true, timestamps: true, versionKey: false })
], Delivery);
exports.Delivery = Delivery;
exports.DeliveryModel = mongoose_1.SchemaFactory.createForClass(Delivery);
//# sourceMappingURL=delivery.model.js.map