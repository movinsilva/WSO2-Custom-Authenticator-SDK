import { Store } from '../models/auth-js';

export default class SessionStore implements Store {
  public async setData(key: string, value: string): Promise<void> {
    sessionStorage.setItem(key, value);
  }

  public async getData(key: string): Promise<string> {
    return sessionStorage.getItem(key) ?? '{}';
  }

  public async removeData(key: string): Promise<void> {
    sessionStorage.removeItem(key);
  }
}
