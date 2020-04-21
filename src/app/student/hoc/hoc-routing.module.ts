import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HocPage } from './hoc.page';

const routes: Routes = [
  {
    path: '',
    component: HocPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then( m => m.ViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HocPageRoutingModule {}
