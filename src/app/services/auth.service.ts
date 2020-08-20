import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLogin = false;

    get isAuth() {
        return this.isLogin;
    }

    login(isAuth) {
        this.isLogin = isAuth;
    }

    logout(isAuth) {
        this.isLogin = isAuth;
    }
}