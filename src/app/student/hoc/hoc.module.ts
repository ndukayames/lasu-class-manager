import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HocPageRoutingModule } from './hoc-routing.module';

import { HocPage } from './hoc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HocPageRoutingModule
  ],
  declarations: [HocPage]
})
export class HocPageModule {}
