import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LampDetailPageRoutingModule } from './lamp-detail-routing.module';

import { LampDetailPage } from './lamp-detail.page';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

// import { IonicTimepickerModule } from '@logisticinfotech/ionic-timepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LampDetailPageRoutingModule,
    // IonicTimepickerModule
  ],
  declarations: [LampDetailPage, ScheduleListComponent]
})
export class LampDetailPageModule {}
