import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmentPage } from './assignment.page';

const routes: Routes = [
  {
    path: '',
    component: AssignmentPage
  },
  {
    path: 'assignment-info',
    loadChildren: () => import('./assignment-info/assignment-info.module').then( m => m.AssignmentInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentPageRoutingModule {}
