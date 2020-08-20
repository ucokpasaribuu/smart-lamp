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
  filter = 'all';
  isAll = true;
  allSite: SiteModel[];

  constructor(
    private lampListService: LamplistService,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.lampListService.getLampList.subscribe(data => {
      this.lampList = data;
    });

    this.lampListService.getSites.subscribe(allSites => {
      this.allSite = allSites;
      console.log(this.allSite);
    })
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
        loadingEl.dismiss();
      });
    });
  }

  segmentChange(value: CustomEvent<any>) {
    this.filter = value.detail.value;
    console.log(value.detail.value === 'all', value.detail.value);

    if (value.detail.value === 'all') {
      this.isAll = true;
      this.filterLampList(value)
    } else {
      this.isAll = false;
      this.filterLampList(value);
    }
  }

  changeFilterSite(value: CustomEvent<any>) {
    this.filterLampList(value);
  }

  filterLampList(value) {
    let getValue = value.detail.value === 'site' ? this.allSite[0].site_code : value.detail.value;
    console.log(getValue)
    this.loadingCtrl.create({
      message: 'Fetching Lamp List ...'
    }).then(loadingEl => {
      loadingEl.present();
      this.lampListService.filterLampList(getValue).subscribe(fetchLampList => {
        this.lampList = fetchLampList;
        loadingEl.dismiss();
      });
    });
  }

}
