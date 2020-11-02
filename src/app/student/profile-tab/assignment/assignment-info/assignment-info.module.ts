import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignmentInfoPageRoutingModule } from './assignment-info-routing.module';

import { AssignmentInfoPage } from './assignment-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignmentInfoPageRoutingModule
  ],
  declarations: [AssignmentInfoPage]
})
export class AssignmentInfoPageModule {}
