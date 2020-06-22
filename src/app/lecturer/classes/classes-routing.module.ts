import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassesPage } from './classes.page';

const routes: Routes = [
  {
    path: '',
    component: ClassesPage
  },
  {
    path: 'departments-in-this-class',
    loadChildren: () => import('./departments-in-this-class/departments-in-this-class.module').then( m => m.DepartmentsInThisClassPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassesPageRoutingModule {}
