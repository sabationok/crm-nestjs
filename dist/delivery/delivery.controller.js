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
exports.DeliveryController = void 0;
const common_1 = require("@nestjs/common");
const request_decorator_1 = require("../decorators/request.decorator");
const delivery_model_1 = require("./delivery.model");
const delivery_service_1 = require("./delivery.service");
let DeliveryController = class DeliveryController {
    constructor(deliveryServise) {
        this.deliveryServise = deliveryServise;
    }
    async getAll(req) {
        return this.deliveryServise.findAll();
    }
    async getByOderId(id) {
        const result = await this.deliveryServise.findByOrderId(id);
        console.log(id);
        if (result.length === 0) {
            throw new common_1.HttpException(`Not found any deliveries to order, orderId:${id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async create(dto, req) {
        console.log(dto);
        return this.deliveryServise.create(dto);
    }
};
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, request_decorator_1.UserRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('getByOrderId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "getByOderId", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, request_decorator_1.UserRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delivery_model_1.DeliveryModel, Object]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "create", null);
DeliveryController = __decorate([
    (0, common_1.Controller)('delivery'),
    __metadata("design:paramtypes", [delivery_service_1.DeliveryService])
], DeliveryController);
exports.DeliveryController = DeliveryController;
//# sourceMappingURL=delivery.controller.js.map