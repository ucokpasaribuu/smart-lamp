import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
import { BackButtonEvent } from '@ionic/core';
const { App } = Plugins;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin = false;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.isAuth.subscribe(isAuthenticate => {
      console.log(isAuthenticate);
      if (isAuthenticate) {
        const routerEl = document.querySelector('ion-router');
        document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
          ev.detail.register(-1, () => {
            const path = window.location.pathname;
            if (path === routerEl.root) {
              App.exitApp();
            }
          });
        });
        // this.loadingCtrl.create({
        //   message: 'Loading ...'
        // }).then(loadingEl => {
        //   loadingEl.present();
  
        //   setTimeout(() => {
        //     this.router.navigateByUrl('lamps/tabs/lamp-list');
            
        //     loadingEl.dismiss();
        //   }, 800);
        // })
        // return;
      }
    });
  }

  onSubmit(form: NgForm) {
    this.authService.login(true);
    this.router.navigateByUrl('/lamps/tabs/lamp-list');
  }
}
