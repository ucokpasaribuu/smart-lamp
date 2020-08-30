import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { map, take, switchMap } from 'rxjs/operators';
import { User } from 'src/models/User.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLogin = new BehaviorSubject<boolean>(false);
    user = new BehaviorSubject<User>(null);

    get isAuth() {
        return this.isLogin.asObservable();
    }

    get userData() {
        return this.user.asObservable();
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

    login(value, data: User) {
        Plugins.Storage.set({key: 'authData', value});
        Plugins.Storage.set({key: 'userData', value: data.email})
        this.isLogin.next(value);
        this.user.next(data);
    }

    logout(value) {
        Plugins.Storage.remove({key: 'authData'});
        Plugins.Storage.remove({key: 'userData'});
        this.isLogin.next(value);
    }
}