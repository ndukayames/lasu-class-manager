import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewPage } from './create-new.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateNewPageRoutingModule {}
