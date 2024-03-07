import { Store } from '../models/auth-js';

export default class SessionStore implements Store {
  private storage: Storage;

  constructor() {
    this.storage = sessionStorage;
  }

  public async setData(key: string, value: string): Promise<void> {
    this.storage.setItem(key, value);
  }

  public async getData(key: string): Promise<string> {
    return this.storage.getItem(key) ?? '{}';
  }

  public async removeData(key: string): Promise<void> {
    this.storage.removeItem(key);
  }
}
