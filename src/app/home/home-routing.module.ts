import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[{
      path: 'login',
      children:[{
        path: '',
        loadChildren: () => import('../student/login/login.module').then(m=>m.LoginPageModule),


      }]
    },
    {
      path: 'register',
      children: [{
        path: '',
        loadChildren: () => import('../student/register/register.module').then(m=>m.RegisterPageModule),

      }]
    },
    
  ]
  },
  {
    path: '',
    component: HomePage,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
