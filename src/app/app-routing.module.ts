import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lamp-list',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import ('./auth/auth.module').then( m => m.AuthPageModule )
  },
  {
    path: 'lamp-list',
    loadChildren: () => import('./pages/lamp-list/lamp-list.module').then( m => m.LampListPageModule)
  },
  {
    path: '**',
    redirectTo: 'lamp-list',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
