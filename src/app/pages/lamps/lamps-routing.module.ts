import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LampsPage } from './lamps.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tabs',
        component: LampsPage,
        children: [
          {
            path: 'lamp-list',
            loadChildren: () => import('./lamp-list/lamp-list.module').then(m => m.LampListPageModule)
          },
          {
            path: 'logout',
            loadChildren: () => import('./lamp-list/lamp-list.module').then(m => m.LampListPageModule)
          }
        ]
      }, 
      {
        path: '',
        redirectTo: '/lamps/tabs/lamp-list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LampsPageRoutingModule {}
