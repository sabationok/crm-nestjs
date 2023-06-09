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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const UserReq_decorator_1 = require("../decorators/UserReq.decorator");
const category_service_1 = require("./category.service");
const getUser_decorator_1 = require("../decorators/getUser.decorator");
const create_category_dto_1 = require("./dto/create-category.dto");
const telegram_service_1 = require("../telegram/telegram.service");
const createError_1 = require("../helpers/createError");
let CategoryController = class CategoryController {
    constructor(categoryService, telegramService) {
        this.categoryService = categoryService;
        this.telegramService = telegramService;
    }
    async getAll(user) {
        const result = await this.categoryService.findAll();
        if (result.length === 0) {
            throw (0, createError_1.default)({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: `Not found any categories`,
            });
        }
        return {
            status: common_1.HttpStatus.OK,
            message: 'All categories',
            data: result,
        };
    }
    async getByParentId(id) {
        const result = await this.categoryService.findByOwnerId(id);
        if (result.length === 0) {
            throw new common_1.HttpException(`Not found any children categories of this category, parentId:${id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: common_1.HttpStatus.OK,
            message: `Children categories, parentId:${id}`,
            data: result,
        };
    }
    async getById(id, user) {
        const result = await this.categoryService.findById(id);
        console.log('id', id);
        if (!result) {
            throw new common_1.HttpException(`Not found any category with id:${id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            user,
            status: common_1.HttpStatus.OK,
            message: `Children categories, parentId:${id}`,
            data: result,
        };
    }
    async create(dto, req) {
        const result = await this.categoryService.create(dto);
        return {
            status: common_1.HttpStatus.OK,
            message: 'Created category',
            data: result,
        };
    }
    async update(id, dto, req) {
        const result = await this.categoryService.updateById(id, dto);
        return {
            status: common_1.HttpStatus.OK,
            message: 'Updated category',
            data: result,
        };
    }
    async deleteById(id, req) {
        const result = await this.categoryService.delete(id);
        if (!result) {
            throw new common_1.HttpException('Not found category for deleting', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: common_1.HttpStatus.OK,
            message: 'Deleted category',
            data: result,
        };
    }
    async clearById(id, req) {
        const result = await this.categoryService.deleteManyByParentId(id);
        if (!result) {
            throw new common_1.HttpException('Not found category for deleting', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: common_1.HttpStatus.OK,
            message: 'Deleted categories',
            data: result,
        };
    }
};
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('getByParentId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getByParentId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, getUser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, UserReq_decorator_1.UserRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, UserReq_decorator_1.UserRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_category_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, UserReq_decorator_1.UserRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Delete)('clearById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, UserReq_decorator_1.UserRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "clearById", null);
CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        telegram_service_1.TelegramService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map