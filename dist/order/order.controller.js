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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_create_dto_1 = require("./dto/order-create.dto");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getAll() {
        return this.orderService.findAll();
    }
    async getShimentsByOrderId(id) {
        const orderPopulated = await this.orderService.getOrderWithShipments(id);
        if (!orderPopulated) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: common_1.HttpStatus.OK,
            message: 'Order with shipments',
            data: orderPopulated,
        };
    }
    async addSipmentToOrder(id) { }
    async create(dto) {
        const newOrderData = Object.assign({ creator: '63ba350d7e5d95426e0fb2be' }, dto);
        const newOrder = await this.orderService.create(newOrderData);
        if (!newOrder) {
            throw new common_1.HttpException('Createing error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            status: common_1.HttpStatus.OK,
            message: 'Order created',
            data: newOrder,
        };
    }
};
__decorate([
    (0, common_1.Get)('getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/:id/shipments'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getShimentsByOrderId", null);
__decorate([
    (0, common_1.Patch)('/:id/addShipment'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "addSipmentToOrder", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_create_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map