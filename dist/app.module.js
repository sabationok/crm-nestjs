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
exports.AppModule = exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongo_config_1 = require("./configs/mongo.config");
const telegramConfig_1 = require("./configs/telegramConfig");
const auth_module_1 = require("./auth/auth.module");
const roles_module_1 = require("./roles/roles.module");
const product_module_1 = require("./product/product.module");
const category_module_1 = require("./category/category.module");
const order_module_1 = require("./order/order.module");
const shipments_module_1 = require("./shipments/shipments.module");
const refunds_module_1 = require("./refunds/refunds.module");
const telegram_module_1 = require("./telegram/telegram.module");
const users_module_1 = require("./users/users.module");
let AppController = class AppController {
    async getHello() {
        return 'Hello my friend';
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    (0, common_1.Controller)('/')
], AppController);
exports.AppController = AppController;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: mongo_config_1.getMongoConfig,
            }),
            auth_module_1.AuthModule,
            roles_module_1.RolesModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule,
            category_module_1.CategoryModule,
            refunds_module_1.RefundsModule,
            telegram_module_1.TelegramModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: telegramConfig_1.getTelegramConfig,
            }),
            shipments_module_1.ShipmentsModule,
            users_module_1.UsersModule,
        ],
        controllers: [AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map