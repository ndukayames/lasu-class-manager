import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAssignmentPage } from './create-assignment.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAssignmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAssignmentPageRoutingModule {}
