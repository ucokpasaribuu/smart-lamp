import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from 'src/models/Schedule.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit {
  allSchedule = [];
  customPickerOptions: any;

  constructor(
    private scheduleService: ScheduleService,
    private modalCtrl: ModalController) { 
      this.customPickerOptions = {
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: (value) => {
              console.log('test', value)
            }
          },
          {
            text: 'Save',
            handler: (value) => {
              
            }
          }
        ]
      }  
    }

  ngOnInit() {
    this.scheduleService.allSchedule.subscribe(allSchedule => {
      if (allSchedule.length > 0) {
        let allTimeSchedule = [];
        for (let schedule of allSchedule) {
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
      }
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
