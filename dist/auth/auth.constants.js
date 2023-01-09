"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_UPDATE_ERROR = exports.ROLE_UPDATE_SUCCESS = exports.LOGOUT_ERROR = exports.LOGOUT_SUCCESS = exports.LOGIN_SUCCESS = exports.WRONG_CREDENTIALS_ERROR = exports.UNAUTHORIZED_USER = exports.USER_NOT_FOUND_ERROR = exports.ALREADY_REGISTERED_ERROR = void 0;
exports.ALREADY_REGISTERED_ERROR = 'Такий користувач уже зареєстрований';
exports.USER_NOT_FOUND_ERROR = 'Користувач із такою адресою не знайдений';
exports.UNAUTHORIZED_USER = 'Не авторизований користувач';
exports.WRONG_CREDENTIALS_ERROR = 'Хибні дані';
exports.LOGIN_SUCCESS = 'Вхід у систему успішний';
exports.LOGOUT_SUCCESS = 'Сеанс завершено';
exports.LOGOUT_ERROR = 'Помилка під час завершення сеансу';
const ROLE_UPDATE_SUCCESS = (email, role) => `Роль користувача "${email}" успішно змінено на "${role}"`;
exports.ROLE_UPDATE_SUCCESS = ROLE_UPDATE_SUCCESS;
exports.ROLE_UPDATE_ERROR = 'Помилка під час зміни ролі користувача';
//# sourceMappingURL=auth.constants.js.map