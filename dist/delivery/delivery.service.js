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
exports.DeliveryService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const delivery_model_1 = require("./delivery.model");
let DeliveryService = class DeliveryService {
    constructor(deliveryModel) {
        this.deliveryModel = deliveryModel;
    }
    async getHello() {
        return 'Hello!';
    }
    async findAll() {
        return this.deliveryModel.find().exec();
    }
    async create(dto) {
        return this.deliveryModel.create(dto);
    }
    async delete(id) {
        return this.deliveryModel.findByIdAndDelete(id).exec();
    }
    async updateById(id, dto) {
        return this.deliveryModel.findByIdAndUpdate(id, dto).exec();
    }
    async findById(id) {
        return this.deliveryModel.find({ _id: id }).exec();
    }
    async findByOrderId(id) {
        return this.deliveryModel.find({ owner: id }).exec();
    }
};
DeliveryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(delivery_model_1.DeliveryModel)),
    __metadata("design:paramtypes", [Object])
], DeliveryService);
exports.DeliveryService = DeliveryService;
//# sourceMappingURL=delivery.service.js.map