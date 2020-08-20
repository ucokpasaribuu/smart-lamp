import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lamps',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import ('./auth/auth.module').then( m => m.AuthPageModule )
  },
  {
    path: 'lamps',
    loadChildren: () => import('./pages/lamps/lamps.module').then( m => m.LampsPageModule)
  },
  {
    path: '**',
    redirectTo: 'lamps',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
