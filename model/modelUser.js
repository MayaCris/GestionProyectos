

export class UserModel {
    constructor() {
        this.localStorgeKey = 'user';
        this.sessionStorgeKey = 'userSession';
    }

    saveToLocalStorage(userData) {
        localStorage.setItem(this.localStorgeKey, JSON.stringify(userData));
    }

    saveToSessionStorage(userData) {
        sessionStorage.setItem(this.sessionStorgeKey, JSON.stringify(userData));
    }

    getFromLocalStorage() {
        const data = localStorage.getItem(this.localStorgeKey);
        return data ? JSON.parse(data) : null;
    }

    getFromSessionStorage() {
        const data = sessionStorage.getItem(this.sessionStorgeKey);
        return data ? JSON.parse(data) : null;
    }

    clearLocalStorage() {
        localStorage.removeItem(this.localStorgeKey);
    }

    clearSessionStorage() {
        sessionStorage.removeItem(this.sessionStorgeKey);
    }
}
