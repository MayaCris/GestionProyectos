

export class UserModel {
    constructor() {
        this.localStorageKey = 'user';
        this.sessionStorageKey = 'userSession';
    }

    saveToLocalStorage(userData) {
        let users = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
        users.push(userData);
        localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    }

    saveToSessionStorage(userData) {
        sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(userData));
    }

    getFromLocalStorage() {
        const data = localStorage.getItem(this.localStorageKey);
        return data ? JSON.parse(data) : null;
    }

    getFromSessionStorage() {
        const data = sessionStorage.getItem(this.sessionStorageKey);
        return data ? JSON.parse(data) : null;
    }

    clearLocalStorage() {
        localStorage.removeItem(this.localStorageKey);
    }

    clearSessionStorage() {
        sessionStorage.removeItem(this.sessionStorageKey);
    }
}
