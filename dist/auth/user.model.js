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
exports.UserModel = exports.FullUser = exports.User = exports.Vendor = exports.Manager = exports.Base = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class Base {
}
exports.Base = Base;
let Manager = class Manager {
};
__decorate([
    (0, mongoose_1.Prop)({ type: () => [mongoose_2.Types.ObjectId] }),
    __metadata("design:type", Array)
], Manager.prototype, "vendors", void 0);
Manager = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Manager);
exports.Manager = Manager;
let Vendor = class Vendor {
};
__decorate([
    (0, mongoose_1.Prop)({ type: () => mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Vendor.prototype, "manager", void 0);
Vendor = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Vendor);
exports.Vendor = Vendor;
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, unique: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'GUEST' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'NOT_ACTIVE' }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => Manager }),
    __metadata("design:type", Manager)
], User.prototype, "manager", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => Vendor }),
    __metadata("design:type", Vendor)
], User.prototype, "vendor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "access_token", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({ _id: true, timestamps: true, versionKey: false })
], User);
exports.User = User;
let FullUser = class FullUser extends User {
};
__decorate([
    (0, mongoose_1.Prop)({ type: () => mongoose_2.Types.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], FullUser.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => Date }),
    __metadata("design:type", Date)
], FullUser.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => Date }),
    __metadata("design:type", Date)
], FullUser.prototype, "updatedAt", void 0);
FullUser = __decorate([
    (0, mongoose_1.Schema)({ _id: true, timestamps: true, versionKey: false })
], FullUser);
exports.FullUser = FullUser;
exports.UserModel = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.model.js.map