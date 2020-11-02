import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentsInThisClassPage } from './departments-in-this-class.page';

const routes: Routes = [
  {
    path: '',
    component: DepartmentsInThisClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentsInThisClassPageRoutingModule {}
