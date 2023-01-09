export const ALREADY_REGISTERED_ERROR = 'Такий користувач уже зареєстрований';
export const USER_NOT_FOUND_ERROR = 'Користувач із такою адресою не знайдений';
export const UNAUTHORIZED_USER = 'Не авторизований користувач';
export const WRONG_CREDENTIALS_ERROR = 'Хибні дані';
export const LOGIN_SUCCESS = 'Вхід у систему успішний';
export const LOGOUT_SUCCESS = 'Сеанс завершено';
export const LOGOUT_ERROR = 'Помилка під час завершення сеансу';
export const ROLE_UPDATE_SUCCESS = (email?: string, role?: string) =>
  `Роль користувача "${email}" успішно змінено на "${role}"`;
export const ROLE_UPDATE_ERROR = 'Помилка під час зміни ролі користувача';
