import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LampDetailPageRoutingModule } from './lamp-detail-routing.module';

import { LampDetailPage } from './lamp-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LampDetailPageRoutingModule
  ],
  declarations: [LampDetailPage]
})
export class LampDetailPageModule {}
