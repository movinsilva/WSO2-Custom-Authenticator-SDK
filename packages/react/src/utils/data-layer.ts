class DataLayer {
    set(key: string, value: any): void {
        console.log('session storage: ', typeof sessionStorage);
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string): any {
        const value = sessionStorage.getItem(key);
        console.log('session storage value: ', value);
        return value ? JSON.parse(value) : null;
    }

    remove(key: string): void {
        sessionStorage.removeItem(key);
    }
}

export default new DataLayer();