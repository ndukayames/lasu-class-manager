import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectuerProfileTabPageRoutingModule } from './lectuer-profile-tab-routing.module';

import { LectuerProfileTabPage } from './lectuer-profile-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LectuerProfileTabPageRoutingModule,
  ],
  declarations: [LectuerProfileTabPage]
})
export class LectuerProfileTabPageModule {}
