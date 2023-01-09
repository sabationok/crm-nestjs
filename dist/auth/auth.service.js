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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const auth_constants_1 = require("./auth.constants");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async getAllUsers() {
        return this.userModel.find().exec();
    }
    async getUserById(id) {
        return this.userModel.findById(id).exec();
    }
    async findUserByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async getCurrentUserInfo(email) {
        return this.findUserByEmail(email);
    }
    async createUser(dto) {
        const salt = (0, bcryptjs_1.genSaltSync)(10);
        const newUser = new this.userModel({
            email: dto.email,
            passwordHash: await (0, bcryptjs_1.hash)(dto.password, salt),
        });
        return newUser.save();
    }
    async updateUserById(id, updateDto) {
        const updatedUser = this.userModel.findByIdAndUpdate(id, updateDto, {
            new: true,
        });
        return updatedUser;
    }
    async setUserRoleById(id, role) {
        const updatedUser = this.userModel.findByIdAndUpdate(id, { role }, { new: true });
        return updatedUser;
    }
    async validateUser(email, password) {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException(auth_constants_1.USER_NOT_FOUND_ERROR);
        }
        const isCorrectPassword = await (0, bcryptjs_1.compare)(password, user.passwordHash);
        if (!isCorrectPassword) {
            throw new common_1.UnauthorizedException(auth_constants_1.WRONG_CREDENTIALS_ERROR);
        }
        return { email: user.email, role: user.role, _id: user._id };
    }
    async logIn(email, role, _id) {
        const payload = { role, _id };
        const access_token = await this.jwtService.signAsync(payload);
        const logedUser = await this.userModel.findByIdAndUpdate(_id, { access_token }, { new: true });
        if (!logedUser) {
            throw new common_1.UnauthorizedException(auth_constants_1.USER_NOT_FOUND_ERROR);
        }
        return logedUser;
    }
    async logOut(_id) {
        return this.userModel.findByIdAndUpdate(_id, { access_token: '' }, { new: true });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('UserModel')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map