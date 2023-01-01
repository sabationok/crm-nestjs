"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRequest = void 0;
const common_1 = require("@nestjs/common");
exports.UserRequest = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req;
});
//# sourceMappingURL=request.decorator.js.map