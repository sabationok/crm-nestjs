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
const createAppResponse_1 = require("../helpers/createAppResponse");
const JwtAuthGuard_guard_1 = require("../guards/JwtAuthGuard.guard");
const createHttpException_1 = require("../helpers/createHttpException");
let AuthController = class AuthController {
    constructor(authService, telegramService) {
        this.authService = authService;
        this.telegramService = telegramService;
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
        const newUser = user;
        return (0, createAppResponse_1.createAppResponse)({
            statusCode: common_1.HttpStatus.OK,
            message: 'Current user info',
            data: {
                meta: {},
                data: newUser,
            },
        });
    }
    async register(dto) {
        const oldUser = await this.authService.findUserByEmail(dto.email);
        if (oldUser) {
            throw (0, createHttpException_1.default)({
                statusCode: common_1.HttpStatus.CONFLICT,
                message: auth_constants_1.ALREADY_REGISTERED_ERROR,
            });
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
    async signIn({ email, password }) {
        const loggedUser = await this.authService.logIn({ email, password });
        this.telegramService.sendMessage(`Авторизовано користувача: ${email} `);
        console.log('loggedUser', loggedUser);
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
    (0, common_1.Get)('getCurrent'),
    (0, common_1.UseGuards)(JwtAuthGuard_guard_1.JwtAuthGuard),
    __param(0, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentById", null);
__decorate([
    (0, common_1.Get)('getCurrentUserInfo'),
    (0, common_1.UseGuards)(JwtAuthGuard_guard_1.JwtAuthGuard),
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
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