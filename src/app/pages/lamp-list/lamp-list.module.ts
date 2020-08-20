import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LampListPageRoutingModule } from './lamp-list-routing.module';

import { LampListPage } from './lamp-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LampListPageRoutingModule
  ],
  declarations: [LampListPage]
})
export class LampListPageModule {}
