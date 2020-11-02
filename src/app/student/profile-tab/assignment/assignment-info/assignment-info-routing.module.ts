import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmentInfoPage } from './assignment-info.page';

const routes: Routes = [
  {
    path: '',
    component: AssignmentInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentInfoPageRoutingModule {}
