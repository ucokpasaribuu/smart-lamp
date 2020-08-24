import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LamplistService } from 'src/app/services/lamplist.service';
import { LampList } from 'src/models/LampList.model';
import { LoadingController, AlertController, PickerController, ModalController } from '@ionic/angular';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

@Component({
  selector: 'app-lamp-detail',
  templateUrl: './lamp-detail.page.html',
  styleUrls: ['./lamp-detail.page.scss'],
})
export class LampDetailPage implements OnInit {
  isLoading = true;
  lampDetail: LampList;
  today: string;
  customPickerOptions: any;
  timeScheduler: any;
  ionDateTimeValue: any;
  defaultTime: any;

  constructor(
    private route: ActivatedRoute,
    private lampListService: LamplistService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private scheduleService: ScheduleService,
    private modalCtrl: ModalController,
    private pickerCtrl: PickerController) { 
      this.customPickerOptions = {
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              this.ionDateTimeValue = this.today;
            }
          },
          {
            text: 'Save',
            handler: (value) => {
              let dataTimePick = `${value.hour.text} ${value.minute.text} ${value.ampm.text}`;
              this.scheduleService.addSchedule(dataTimePick).subscribe(data => {
              });
            }
          }
        ]
      }

    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lampListService.lampDetail(params.deviceCode).subscribe(data => {
        this.lampDetail = data;

        this.isLoading = false;
        this.today = new Date().toISOString();
        this.ionDateTimeValue = this.today;
      });
    });
  }

  test(value) {
    this.today = value;
  }

  ionDateTimeSet() {
    document.getElementById('ionDateTime').click();
  }

  changeStatus(status, deviceCode) {
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
              this.lampListService.updateStatusLamp(deviceCode, updateStatus).subscribe(() => {
                this.ngOnInit();
                
                loadingEl.dismiss();
              });
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Canceling Lamp Status ...'
            }).then(loadingEl => {
              loadingEl.present();
              
              this.lampListService.updateStatusLamp(deviceCode, status).subscribe(() => {
                this.ngOnInit();

                loadingEl.dismiss();
              });
            });
          }
        }
      ]
    }).then(alertEl => {
      this.lampDetail.status = updateStatus;
      alertEl.present();
    })
  }

  openScheduleList() {
    console.log('open schedule list');
    this.modalCtrl.create({
      component: ScheduleListComponent
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resData => {
      console.log(resData);
    })
  }

}
