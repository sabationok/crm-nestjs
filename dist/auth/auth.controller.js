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
const telegram_service_1 = require("../telegram/telegram.service");
const auth_constants_1 = require("./auth.constants");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const setUserRole_dto_1 = require("./dto/setUserRole.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const AuthGuard_guard_1 = require("../guards/AuthGuard.guard");
const createAppResponse_1 = require("../helpers/createAppResponse");
let AuthController = class AuthController {
    constructor(authService, telegramService) {
        this.authService = authService;
        this.telegramService = telegramService;
    }
    async getAll() {
        const users = await this.authService.getAllUsers();
        return (0, createAppResponse_1.createAppResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'All users',
            data: {
                meta: {},
                data: users,
            },
        });
    }
    async getUserById(user) {
        return (0, createAppResponse_1.createAppResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Found user',
            data: {
                meta: {},
                data: user,
            },
        });
    }
    async updateUserById(id, updateDto) {
        const result = await this.authService.updateUserById(id, updateDto);
        if (!result) {
            throw new common_1.HttpException('Not found user for update ', common_1.HttpStatus.NOT_FOUND);
        }
        return (0, createAppResponse_1.createAppResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Updating success',
            data: {
                meta: {},
                data: result,
            },
        });
    }
    async setUserRoleById(id, roleDto) {
        const userForUpdate = await this.authService.getUserById(id);
        if ((userForUpdate === null || userForUpdate === void 0 ? void 0 : userForUpdate.role) === (roleDto === null || roleDto === void 0 ? void 0 : roleDto.role)) {
            throw new common_1.HttpException(auth_constants_1.ROLE_UPDATE_ERROR, common_1.HttpStatus.NOT_FOUND);
        }
        const updatedUser = await this.authService.setUserRoleById(id, roleDto === null || roleDto === void 0 ? void 0 : roleDto.role);
        if (!updatedUser) {
            throw new common_1.HttpException(auth_constants_1.ROLE_UPDATE_ERROR, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const data = {
            email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
            role: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.role,
        };
        return {
            status: common_1.HttpStatus.OK,
            message: (0, auth_constants_1.ROLE_UPDATE_SUCCESS)(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email, updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.role),
            data,
        };
    }
    async getCurrentById({ access_token, email }) {
        return (0, createAppResponse_1.createAppResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Found user',
            data: {
                meta: {},
                data: { access_token, email },
            },
        });
    }
    async getCurrentUserInfo(user) {
        const userInfo = await this.authService.getCurrentUserInfo(user._id);
        if (!userInfo) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return {
            status: common_1.HttpStatus.OK,
            message: 'Current user info',
            data: userInfo,
        };
    }
    async register(dto) {
        const oldUser = await this.authService.findUserByEmail(dto.email);
        if (oldUser) {
            throw new common_1.BadRequestException(auth_constants_1.ALREADY_REGISTERED_ERROR);
        }
        const newUser = await this.authService.createUser(dto);
        await this.telegramService.sendMessage(`Зареєстровано нового користувача: ${newUser}`);
        return { status: common_1.HttpStatus.OK, message: 'New user rigister', newUser };
    }
    async registerByAdmin(dto) {
        const oldUser = await this.authService.findUserByEmail(dto.email);
        if (oldUser) {
            throw new common_1.HttpException(auth_constants_1.ALREADY_REGISTERED_ERROR, common_1.HttpStatus.CONFLICT);
        }
        const newUser = await this.authService.createUser(dto);
        await this.telegramService.sendMessage(`Зареєстровано нового користувача адміністратором: ${newUser}`);
        return { status: common_1.HttpStatus.OK, message: 'New user rigister', newUser };
    }
    async signIn({ email, password }, req) {
        const result = await this.authService.validateUser(email, password);
        if (!result) {
            throw new common_1.HttpException(auth_constants_1.UNAUTHORIZED_USER, common_1.HttpStatus.UNAUTHORIZED);
        }
        const loggedUser = await this.authService.logIn(result._id, result.role, result.status);
        this.telegramService.sendMessage(`Авторизовано користувача: ${email} `);
        console.log('loggedUser', result);
        return (0, createAppResponse_1.createAppResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: auth_constants_1.LOGIN_SUCCESS,
            data: {
                meta: {},
                data: { access_token: loggedUser.access_token },
            },
        });
    }
    async signOut(user) {
        const logOutUser = await this.authService.logOut(user._id);
        await this.telegramService.sendMessage(`Користувач завершив сеанс (${logOutUser === null || logOutUser === void 0 ? void 0 : logOutUser.email})`);
        return { status: common_1.HttpStatus.OK, message: auth_constants_1.LOGOUT_SUCCESS };
    }
};
__decorate([
    (0, common_1.Get)('getAllUsers'),
    (0, common_1.UseGuards)(AuthGuard_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('getUserById'),
    (0, common_1.UseGuards)(AuthGuard_guard_1.AuthGuard),
    __param(0, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Patch)('updateUserById/:id'),
    (0, common_1.UseGuards)(AuthGuard_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Patch)('setUserRoleById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, setUserRole_dto_1.SetUserRoleDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setUserRoleById", null);
__decorate([
    (0, common_1.Get)('getCurrent'),
    (0, common_1.UseGuards)(AuthGuard_guard_1.AuthGuard),
    __param(0, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentById", null);
__decorate([
    (0, common_1.Get)('getCurrentUserInfo'),
    __param(0, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUserInfo", null);
__decorate([
    (0, common_1.Post)('signUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('signUpByAdmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerByAdmin", null);
__decorate([
    (0, common_1.Post)('signIn'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('signOut'),
    __param(0, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        telegram_service_1.TelegramService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map