import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LampDetailPage } from './lamp-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LampDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LampDetailPageRoutingModule {}
