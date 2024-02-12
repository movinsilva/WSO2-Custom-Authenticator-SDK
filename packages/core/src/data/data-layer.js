class DataLayer {
  constructor() {
    this.data = {};
  }

  set(key, value) {
    this.data[key] = value;
  }

  get(key) {
    return this.data[key];
  }

  remove(key) {
    delete this.data[key];
  }
}

export default new DataLayer();
