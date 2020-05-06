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
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LectuerProfileTabPageRoutingModule {}
