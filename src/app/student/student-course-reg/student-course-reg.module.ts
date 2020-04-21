import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentCourseRegPageRoutingModule } from './student-course-reg-routing.module';

import { StudentCourseRegPage } from './student-course-reg.page';
import { ViewPageModule } from './view/view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentCourseRegPageRoutingModule,
    ViewPageModule
  ],
  declarations: [StudentCourseRegPage]
})
export class StudentCourseRegPageModule {}
