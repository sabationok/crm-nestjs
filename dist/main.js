"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function start(app, PORT, globalPrefix) {
    await app.listen(process.env.PORT || PORT, () => common_1.Logger.log(`>>>>>>>>>>>> Server started. http://localhost:${PORT}/${globalPrefix} <<<<<<<<<<<<<<`));
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    await start(app, 3030, 'api');
}
bootstrap();
//# sourceMappingURL=main.js.map