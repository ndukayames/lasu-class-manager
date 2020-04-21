import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteProfileSignupPageRoutingModule } from './complete-profile-signup-routing.module';

import { CompleteProfileSignupPage } from './complete-profile-signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteProfileSignupPageRoutingModule
  ],
  declarations: [CompleteProfileSignupPage]
})
export class CompleteProfileSignupPageModule {}
