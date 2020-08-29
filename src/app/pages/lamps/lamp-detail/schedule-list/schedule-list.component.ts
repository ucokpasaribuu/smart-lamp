import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from 'src/models/Schedule.model';
import { ModalController, IonDatetime, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit {
  @Input() deviceCode: string;
  @ViewChild('ionDateTime') ionDateTime: IonDatetime;

  allSchedule = [];
  allScheduleId = [];
  updateIdSchedule: number;
  customPickerOptions: any;

  constructor(
    private scheduleService: ScheduleService,
    private modalCtrl: ModalController, 
    private loadingCtrl: LoadingController) { 
      this.customPickerOptions = {
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: (value) => {
              this.ionViewWillEnter();
              return false;
            }
          },
          {
            text: 'Save',
            handler: (value) => {
              let idSchedule = this.allSchedule.length + 1;

              let updateSch = this.allScheduleId.find(id => id === this.updateIdSchedule);
              
              if (!updateSch) {
                console.log('add new schedule')
                this.scheduleService.addSchedule(idSchedule, `${value.hour.text} ${value.minute.text} ${value.ampm.text}`, this.deviceCode).subscribe(data => {
                  this.ionViewWillEnter();
                });
              } else {
                console.log('update schedule')
                this.scheduleService.updateSchedule(+this.updateIdSchedule, `${value.hour.text} ${value.minute.text} ${value.ampm.text}`, this.deviceCode).subscribe(dataUpdate => {
                  this.ionViewWillEnter();
                });
              }
            }
          }
        ]
      }  
    }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.scheduleService.allSchedule.subscribe(allSchedule => {
      let scheduleFilter = allSchedule.filter(item => item.deviceCode === this.deviceCode);
      if (scheduleFilter.length > 0) {
        let allTimeSchedule = [];
        let allScheduleIdArr = [];

        for (let schedule of scheduleFilter) {
          allScheduleIdArr.push(+schedule.id);

          let timeScedule = schedule.timeSchedule;
          let subTimeSchedule = timeScedule.split(' ');
          
          allTimeSchedule.push({
            ampm: {
              columnIndex: 2,
              text: subTimeSchedule[2],
              value: subTimeSchedule[2].toLowerCase()
            },
            hour: {
              columnIndex: 0,
              text: subTimeSchedule[0],
              value: parseInt(subTimeSchedule[0])
            },
            minute: {
              columnIndex: 1,
              text: subTimeSchedule[1],
              value: parseInt(subTimeSchedule[1])
            }
          })
        }
        
        this.allSchedule = [...allTimeSchedule];
        this.allScheduleId = [...allScheduleIdArr];
      } else {
        this.allSchedule = [];
        this.allScheduleId = [];
      }
    });
  }

  onUpdate(id) {
    this.updateIdSchedule = +id;
    console.log(this.updateIdSchedule);
  }

  onUpdateTime(id) {
    document.getElementById(`${id}`).click();
  }

  removeSchedule(id) {
    this.scheduleService.removeSchedule(+id).subscribe(data => {
      this.ionViewWillEnter();
    })
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
