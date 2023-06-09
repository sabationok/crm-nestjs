"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtConfig = void 0;
const getJwtConfig = async (configService) => {
    return {
        secret: configService.get('JWT_SECRET'),
        signOptions: {
            expiresIn: configService.get('JWT_EXPIRE_TIME'),
        },
    };
};
exports.getJwtConfig = getJwtConfig;
//# sourceMappingURL=jwt_config.js.map