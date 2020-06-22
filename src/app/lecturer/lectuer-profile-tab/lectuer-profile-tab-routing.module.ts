import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LectuerProfileTabPage } from './lectuer-profile-tab.page';

const routes: Routes = [
  {
    path: '',
    component: LectuerProfileTabPage,
    children: [{
      path: 'dashboard',
      loadChildren: () => import('../dashboard/dashboard.module').then(m=>m.DashboardPageModule)
    },
    {
      path: 'my-profile',
      loadChildren: () => import('../my-profile/my-profile.module').then(m=>m.MyProfilePageModule)
    },
    {
      path: '',
      redirectTo: '/lecturer-profile-tab',
      pathMatch: 'full'
    },
    {
      path: 'classes',
      children: [{
        path: '',
        loadChildren: () => import('./classes/classes.module').then( m => m.ClassesPageModule)
      },{
        path: ':department_in_this_class',
        loadChildren: () => import('../classes/departments-in-this-class/departments-in-this-class.module').then(m=>m.DepartmentsInThisClassPageModule)
      }]
    },
    {
      path: 'assignment',
      children: [{
        path: '',
        loadChildren: () => import('./assignment/assignment.module').then( m => m.AssignmentPageModule)
      },
      {
        path: ':course_code',
        loadChildren: () => import('./assignment/assignment-info/assignment-info.module').then(m=>m.AssignmentInfoPageModule)
      },
      {
        path: 'create-assignment',
        loadChildren: () => import('./assignment/create-assignment/create-assignment.module').then( m => m.CreateAssignmentPageModule)
      }
    ]
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LectuerProfileTabPageRoutingModule {}
