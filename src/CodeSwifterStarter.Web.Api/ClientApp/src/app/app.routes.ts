import { Routes } from '@angular/router';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
    data:{ reuse:true } 
  }
];

