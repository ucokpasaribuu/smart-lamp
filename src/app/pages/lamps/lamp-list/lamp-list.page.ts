import { Component, OnInit } from '@angular/core';
import { LamplistService } from 'src/app/services/lamplist.service';
import { LampList } from 'src/models/LampList.model';
import { AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SiteModel } from 'src/models/Site.model';

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
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
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
      this.lampListService.updateStatusLamp(deviceCode, value).subscribe(updateLampList => {
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

    this.filterLampList(this.filterSite);
  }

  filterLampList(value) {    
    this.loadingCtrl.create({
      message: 'Fetching Lamp List ...'
    }).then(loadingEl => {
      loadingEl.present();
      this.lampListService.filterLampList(this.filterSite).subscribe(fetchLampList => {
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
            this.router.navigateByUrl('/auth');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.router.navigateByUrl('/lamps/tabs/lamp-list');
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    })
  }

}
