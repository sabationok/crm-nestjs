import { AsyncLocalStorage } from 'async_hooks';
import { FindUser } from 'src/auth/findUser.model';

export const UserStorage = {
  storage: new AsyncLocalStorage<FindUser>(),
  get() {
    return this.storage.getStore();
  },
  set(user: FindUser) {
    return this.storage.enterWith(user);
  },
};
