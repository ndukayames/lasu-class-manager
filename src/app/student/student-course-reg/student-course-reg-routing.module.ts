import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentCourseRegPage } from './student-course-reg.page';

const routes: Routes = [
  {
    path: '',
    component: StudentCourseRegPage
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then( m => m.ViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentCourseRegPageRoutingModule {}
