"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const order_model_1 = require("./order.model");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        controllers: [order_controller_1.OrderController],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: order_model_1.Order.name,
                    schema: order_model_1.OrderModel,
                },
            ]),
            config_1.ConfigModule,
        ],
        providers: [order_service_1.OrderService],
        exports: [order_service_1.OrderService],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map