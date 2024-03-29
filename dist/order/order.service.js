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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_model_1 = require("./order.model");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let OrderService = class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async findAll() {
        return this.orderModel
            .find()
            .populate({ path: 'creator', select: 'role email' })
            .exec();
    }
    async create(dto) {
        return this.orderModel.create(dto);
    }
    async delete(id) {
        return this.orderModel.findByIdAndDelete(id).exec();
    }
    async updateById(id, dto) {
        return this.orderModel.findByIdAndUpdate(id, dto).exec();
    }
    async findById(id) {
        return (this.orderModel
            .findById(id)
            .populate({ path: 'creator', select: 'role email' })
            .exec());
    }
    async findByCreatorId(id) {
        return this.orderModel.find({ creatorId: id }).exec();
    }
    async findByManagerId(id) {
        return this.orderModel.find({ managerId: id }).exec();
    }
    async addContentItems(orderId, itemsIdsArr) {
        return this.orderModel.findByIdAndUpdate(orderId, {
            $push: { contentIdArr: { $each: itemsIdsArr, $sort: { _id: -1 } } },
        }, { new: true });
    }
    async removeContentItem(orderId, itemId) {
        return this.orderModel.findByIdAndUpdate(orderId, { $pull: { content: itemId } }, { new: true });
    }
    async addShipment(orderId, shipmentId) {
        return this.orderModel.findByIdAndUpdate(orderId, { $addToSet: { shipments: shipmentId } }, { new: true });
    }
    async removeShipment(orderId, shipmentId) {
        return this.orderModel.findByIdAndUpdate(orderId, { $pull: { shipments: shipmentId } }, { new: true });
    }
    async getOrderWithShipments(orderId) {
        return this.orderModel
            .findById(orderId)
            .populate({ path: 'shipments', select: 'ttn' })
            .exec();
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(order_model_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map