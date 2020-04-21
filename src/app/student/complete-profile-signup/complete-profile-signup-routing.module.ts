import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteProfileSignupPage } from './complete-profile-signup.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteProfileSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteProfileSignupPageRoutingModule {}
