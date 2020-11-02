import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileTabPage } from './profile-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileTabPage,
    children:[{
      path: 'profile',
      children: [{
        path: '',
        loadChildren: () => import('../profile/profile.module').then(m=>m.ProfilePageModule)
      },
      {
        path: 'edit-profile',
        loadChildren: () => import('../edit-profile/edit-profile.module').then(m=>m.EditProfilePageModule),
  
      },
      {
        path: 'complete-registration',
        loadChildren: () => import('../complete-profile-signup/complete-profile-signup.module').then(m=>m.CompleteProfileSignupPageModule)
      },
      ]
      },
      {
        path: 'hoc',
        children: [
          {
            path: '',
            loadChildren: () => import('../hoc/hoc.module').then(m=>m.HocPageModule)
          },
          {
              path: 'view/:courseCode',
              loadChildren: () => import('../hoc/view/view.module').then(m=>m.ViewPageModule)
          },
          {
            path: 'create-semester-class',
            loadChildren: () => import('../hoc/create/create.module').then(m=>m.CreatePageModule)
          }
        ]
      },
      {
        path: 'student-course-reg',
        children:[
          {
            path: '',
            loadChildren: () => import('../student-course-reg/student-course-reg.module').then(m=>m.StudentCourseRegPageModule)
          },
          {
            path: 'view/:courseCode',
            loadChildren: () => import('../student-course-reg/view/view.module').then(m=>m.ViewPageModule)

          }
        ]
      },
      {
        path: 'assignments',
        children: [
          {
          path: '',
          loadChildren: () => import('../profile-tab/assignment/assignment.module').then(m=>m.AssignmentPageModule)
          },
          {
            path: ':courseCode',
            loadChildren: () => import('../profile-tab/assignment/assignment-info/assignment-info.module').then(m=>m.AssignmentInfoPageModule)
          }
      ]
        
      },
      {
        path: '',
        redirectTo: '/student-profile-tab',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileTabPageRoutingModule {}
