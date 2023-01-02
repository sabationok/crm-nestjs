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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const getUser_decorator_1 = require("../decorators/getUser.decorator");
const jwt_guards_1 = require("../guards/jwt.guards");
const auth_constants_1 = require("./auth.constants");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const setUserRole_dto_1 = require("./dto/setUserRole.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async getAll() {
        return this.authService.getAllUsers();
    }
    async getUserById(userId) {
        const result = await this.authService.getUserById(userId);
        return { status: common_1.HttpStatus.OK, data: result, message: 'Found user' };
    }
    async updateUserById(id, updateDto) {
        const result = await this.authService.updateUserById(id, updateDto);
        if (!result) {
            throw new common_1.HttpException('Not found user for update ', common_1.HttpStatus.NOT_FOUND);
        }
        return { status: common_1.HttpStatus.OK, data: result, message: 'Updating success' };
    }
    async getCurrentUser(user) {
        return {
            status: common_1.HttpStatus.OK,
            data: user,
            message: 'Current user',
        };
    }
    async getCurrentUserInfo(user) {
        const result = await this.authService.getCurrentUserInfo(user.email);
        if (!result) {
            throw new common_1.HttpException('', common_1.HttpStatus.NOT_FOUND);
        }
        const userInfo = {
            _id: result === null || result === void 0 ? void 0 : result._id,
            createdAt: result === null || result === void 0 ? void 0 : result.createdAt,
            updatedAt: result === null || result === void 0 ? void 0 : result.updatedAt,
            status: result === null || result === void 0 ? void 0 : result.status,
            role: result === null || result === void 0 ? void 0 : result.role,
            email: result === null || result === void 0 ? void 0 : result.email,
            name: result === null || result === void 0 ? void 0 : result.name,
            phone: result === null || result === void 0 ? void 0 : result.phone,
        };
        const managerInfo = Object.assign(Object.assign({}, userInfo), { vendors: result === null || result === void 0 ? void 0 : result.vendors });
        return {
            status: common_1.HttpStatus.OK,
            data: (result === null || result === void 0 ? void 0 : result.role) === 'MANAGER' ? managerInfo : userInfo,
            message: 'Current user info',
        };
    }
    async setUserRoleById(id, roleDto) {
        const result = await this.authService.setUserRoleById(id, roleDto);
        if (!result) {
            throw new common_1.HttpException('Not found user for update ', common_1.HttpStatus.NOT_FOUND);
        }
        return { status: common_1.HttpStatus.OK, data: result, message: 'Updating success' };
    }
    async register(dto) {
        const oldUser = await this.authService.findUserByEmail(dto.email);
        if (oldUser) {
            throw new common_1.BadRequestException(auth_constants_1.ALREADY_REGISTERED_ERROR);
        }
        return this.authService.createUser(dto);
    }
    async login({ email, password }) {
        const validatedUser = await this.authService.validateUser(email, password);
        if (!validatedUser) {
            throw new common_1.HttpException('', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.authService.login(email, validatedUser.role);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Get)('getAllUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Get)('getUserById'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Patch)('updateUserById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Get)('getCurrentUser'),
    __param(0, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Get)('getCurrentUserInfo'),
    __param(0, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUserInfo", null);
__decorate([
    (0, common_1.Patch)('setUserRoleById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, setUserRole_dto_1.SetUserRoleDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setUserRoleById", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map