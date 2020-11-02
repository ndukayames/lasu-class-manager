import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartmentsInThisClassPageRoutingModule } from './departments-in-this-class-routing.module';

import { DepartmentsInThisClassPage } from './departments-in-this-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartmentsInThisClassPageRoutingModule
  ],
  declarations: [DepartmentsInThisClassPage]
})
export class DepartmentsInThisClassPageModule {}
