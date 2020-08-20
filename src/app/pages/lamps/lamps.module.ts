import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LampsPageRoutingModule } from './lamps-routing.module';

import { LampsPage } from './lamps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LampsPageRoutingModule
  ],
  declarations: [LampsPage]
})
export class LampsPageModule {}
