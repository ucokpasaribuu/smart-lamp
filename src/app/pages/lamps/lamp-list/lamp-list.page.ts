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
    private authService: AuthService,
    private actionSheetCtrl: ActionSheetController) { }

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

  changeStatus(status, deviceCode, lampName?) {
    let changeStatus = status === 1 ? 'off' : 'on';
    let updateStatus = status === 1 ? 2 : 1;

    this.alertCtrl.create({
      header: 'Choose an action?',
      cssClass: 'alert-lamp-list-action',
      buttons: [
        {
          text: `Turn ${changeStatus} ${lampName}`,
          handler: () => {
            this.updateLampStatus(deviceCode, updateStatus);
          }
        },
        {
          text: `View Detail`,
          handler: () => {
            this.router.navigateByUrl(`${this.currentUrl}/${deviceCode}`);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
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

  changeFilterSite () {
    let inputFilterSite = [];

    inputFilterSite.push({
      type: 'radio',
      label: 'All',
      value: 'all',
      checked: this.filterSite === 'all' ? true : false,
      name: 'all',
      placeholder: 'all',
      id: 'all'
    })

    for (let el of this.allSite) {
      inputFilterSite.push(
        {
          type: 'radio',
          label: el.site_name,
          value: el.site_code,
          checked: this.filterSite === el.site_code ? true : false,
          name: el.site_code,
          placeholder: el.site_name,
          id: el.site_code
        }
      );
    }
    
    this.alertCtrl.create({
      header: `Choose Site?`,
      cssClass: 'alert-change-filter',
      inputs: inputFilterSite,
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            this.filterLampList(data);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('filter was cancelled');
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    })
  }

  filterLampList(value) {
    this.filterSite = value;
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
