import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { map, take, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLogin = new BehaviorSubject<boolean>(false);

    get isAuth() {
        return this.isLogin.asObservable();
    }

    autoLogin() {
        return from(Plugins.Storage.get({key: 'authData'})).pipe(
            map(dataStorage => {
                if (!dataStorage || !dataStorage.value) {
                    return null;
                }

                return dataStorage.value;
            }),
            map(data => {
                return !!data;
            })
        );
    }

    login(value) {
        Plugins.Storage.set({key: 'authData', value});
        this.isLogin.next(value);
    }

    logout(value) {
        Plugins.Storage.remove({key: 'authData'});
        this.isLogin.next(value);
    }
}