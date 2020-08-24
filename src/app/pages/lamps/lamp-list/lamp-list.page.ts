import { Component, OnInit } from '@angular/core';
import { LamplistService } from 'src/app/services/lamplist.service';
import { LampList } from 'src/models/LampList.model';
import { AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SiteModel } from 'src/models/Site.model';

import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { AuthService } from 'src/app/services/auth.service';
const { App } = Plugins;

@Component({
  selector: 'app-lamp-list',
  templateUrl: './lamp-list.page.html',
  styleUrls: ['./lamp-list.page.scss'],
})
export class LampListPage implements OnInit {
  lampList: LampList[];
  filterSite = 'all';
  isAll = true;
  allSite: SiteModel[];
  currentUrl: string;
  reloadFilterSite = false;

  constructor(
    private lampListService: LamplistService,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private authService: AuthService) { }

  ngOnInit() {
    this.currentUrl = this.router.url;

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  ionViewWillEnter() {
    this.currentUrl = this.router.url;

    this.lampListService.getSites.subscribe(allSites => {
      this.allSite = allSites;

      if ((this.router.url === '/lamps/tabs/sites') && !this.reloadFilterSite) {
        this.filterSite = this.allSite[0].site_code;
        this.isAll = false;
      }

      this.filterLampList(this.filterSite);
      this.currentUrl = this.router.url;
    });
  }

  changeStatus(status, deviceCode) {
    let changeStatus = status === 1 ? 'off' : 'on';
    let updateStatus = status === 1 ? 2 : 1;
    
    this.alertCtrl.create({
      header: `Are you sure to turn ${changeStatus} this lamp?`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.updateLampStatus(deviceCode, updateStatus);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.updateLampStatus(deviceCode, status);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    })
  }

  updateLampStatus(deviceCode, value) {
    this.loadingCtrl.create({
      message: 'Updating Lamp Status ...'
    }).then(loadingEl => {
      loadingEl.present();
      this.lampListService.updateStatusLamp(deviceCode, value).subscribe(() => {
        if (this.filterSite !== 'all') {
          this.reloadFilterSite = true;
          this.ionViewWillEnter();
        }

        loadingEl.dismiss();
      });
    });
  }

  changeFilterSite(value: CustomEvent<any>) {
    this.filterSite = value.detail.value;
    this.reloadFilterSite = true;

    this.filterLampList(this.filterSite);

    this.currentUrl = this.router.url;
  }

  filterLampList(value) {
    this.loadingCtrl.create({
      message: 'Fetching Lamp List ...'
    }).then(loadingEl => {
      loadingEl.present();
      this.lampListService.filterLampList(value).subscribe(fetchLampList => {
        this.lampList = fetchLampList;
        loadingEl.dismiss();
      });
    });
  }

  onLogout() {
    this.alertCtrl.create({
      header: 'Are you sure to logout?',
      buttons: [
        {
          text: 'Logout',
          handler: () => {
            this.authService.logout(false);
            this.router.navigateByUrl('/auth');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    })
  }

}
