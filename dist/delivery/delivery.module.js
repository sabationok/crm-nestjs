"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryModule = void 0;
const common_1 = require("@nestjs/common");
const delivery_service_1 = require("./delivery.service");
const delivery_controller_1 = require("./delivery.controller");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const delivery_model_1 = require("./delivery.model");
const config_1 = require("@nestjs/config");
let DeliveryModule = class DeliveryModule {
};
DeliveryModule = __decorate([
    (0, common_1.Module)({
        controllers: [delivery_controller_1.DeliveryController],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: delivery_model_1.DeliveryModel,
                    schemaOptions: {
                        collection: 'Deliveries',
                    },
                },
            ]),
            config_1.ConfigModule,
        ],
        providers: [delivery_service_1.DeliveryService],
    })
], DeliveryModule);
exports.DeliveryModule = DeliveryModule;
//# sourceMappingURL=delivery.module.js.map