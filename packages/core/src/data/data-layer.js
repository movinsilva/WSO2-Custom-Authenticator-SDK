// class DataLayer {
//   constructor() {
//     this.data = {};
//   }

//   set(key, value) {
//     this.data[key] = value;
//   }

//   get(key) {
//     return this.data[key];
//   }

//   remove(key) {
//     delete this.data[key];
//   }
// }

// export default new DataLayer();

class DataLayer {
  set(key, value) {
    console.log('session storage: ', typeof sessionStorage);
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    const value = sessionStorage.getItem(key);
    console.log('session storage value: ', value);
    return value ? JSON.parse(value) : null;
  }

  remove(key) {
    sessionStorage.removeItem(key);
  }
}

export default new DataLayer();
