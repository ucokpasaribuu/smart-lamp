import { Component, OnInit } from '@angular/core';
import { LamplistService } from 'src/app/services/lamplist.service';
import { LampList } from 'src/models/LampList.model';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lamp-list',
  templateUrl: './lamp-list.page.html',
  styleUrls: ['./lamp-list.page.scss'],
})
export class LampListPage implements OnInit {
  lampList: LampList[];

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
      console.log(this.lampList);
    });
  }

  changeStatus(value, deviceCode) {
    let status = value.detail.checked === true ? 'on' : 'off';
    
    this.alertCtrl.create({
      header: `Are you sure to turn ${status} this lamp?`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.updateLampStatus(deviceCode, value.detail.checked);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.updateLampStatus(deviceCode, !value.detail.checked);
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

}
