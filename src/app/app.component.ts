import { Component, OnInit } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Plugins } from '@capacitor/core';
import { BackButtonEvent } from '@ionic/core';
const { App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loadingCtrl: LoadingController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    // this.loadingCtrl.create({
    //   message: 'Please wait ...'
    // }).then(loadingEl => {
    //   loadingEl.present();

    //   setTimeout(() => {
    //     loadingEl.dismiss();
    //   }, 500);
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    const routerEl = document.querySelector('ion-router');
    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
      ev.detail.register(-1, () => {
        const path = window.location.pathname;
        if (path === routerEl.root) {
          App.exitApp();
        }
      });
    });
  }
}
