import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LamplistService } from 'src/app/services/lamplist.service';
import { LampList } from 'src/models/LampList.model';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lamp-detail',
  templateUrl: './lamp-detail.page.html',
  styleUrls: ['./lamp-detail.page.scss'],
})
export class LampDetailPage implements OnInit {
  isLoading = true;
  lampDetail: LampList;

  constructor(
    private route: ActivatedRoute,
    private lampListService: LamplistService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lampListService.lampDetail(params.deviceCode).subscribe(data => {
        this.lampDetail = data;
        this.isLoading = false;
      });
    });
  }

  changeStatus(deviceCode, status) {
    let changeStatus = status === 1 ? 'off' : 'on';
    let updateStatus = status === 1 ? 2 : 1;

    this.alertCtrl.create({
      header: `Are you sure to turn ${changeStatus} this lamp?`,
      buttons:[
        {
          text: 'Okay',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Updating Lamp Status ...'
            }).then(loadingEl => {
              loadingEl.present();
              this.lampListService.updateStatusLamp(deviceCode, updateStatus).subscribe(updateLampList => {
                this.lampDetail = updateLampList.find(lamp => lamp.device_code === deviceCode);
                
                loadingEl.dismiss();
              });
            });
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
    })
  }

}
