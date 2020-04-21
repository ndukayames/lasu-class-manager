import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, NoPreloading } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'student-login',
    loadChildren: () => import('./student/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'student-profile-tab',
    loadChildren: () => import('./student/profile-tab/profile-tab.module').then( m => m.ProfileTabPageModule),
  },
  {
    path: 'lecturer-login',
    loadChildren: () => import('./lecturer/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./student/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'complete-profile-signup',
    loadChildren: () => import('./student/complete-profile-signup/complete-profile-signup.module').then( m => m.CompleteProfileSignupPageModule)
  },
  {
    path: 'hoc',
    loadChildren: () => import('./student/hoc/hoc.module').then( m => m.HocPageModule)
  },
  {
    path: 'student-course-reg',
    loadChildren: () => import('./student/student-course-reg/student-course-reg.module').then( m => m.StudentCourseRegPageModule)
  },
  {
    path: 'lectuer-profile-tab',
    loadChildren: () => import('./lecturer/lectuer-profile-tab/lectuer-profile-tab.module').then( m => m.LectuerProfileTabPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./lecturer/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./lecturer/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./lecturer/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'assignment',
    loadChildren: () => import('./lecturer/assignment/assignment.module').then( m => m.AssignmentPageModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('./lecturer/classes/classes.module').then( m => m.ClassesPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./lecturer/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
