"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoConfig = void 0;
const getMongoConfig = async (configService) => {
    return Object.assign({ uri: getMongoString(configService) }, getMongoOptions());
};
exports.getMongoConfig = getMongoConfig;
const getMongoString = (configService) => 'mongodb+srv://' +
    configService.get('MONGO_DB_USER') +
    ':' +
    configService.get('MONGO_DB_PASSWORD') +
    '@' +
    configService.get('MONGO_DB_PROJECT') +
    '.mongodb.net/' +
    configService.get('MONGO_DB_NAME');
const getMongoOptions = () => ({
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//# sourceMappingURL=mongo.config%20copy.js.map