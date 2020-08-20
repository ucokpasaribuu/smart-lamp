import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LampListPage } from './lamp-list.page';

const routes: Routes = [
  {
    path: '',
    component: LampListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LampListPageRoutingModule {}
