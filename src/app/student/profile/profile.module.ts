import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ViewPageModule } from '../student-course-reg/view/view.module';
// import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ViewPageModule,
    NgxDatatableModule
  ],
  declarations: [ProfilePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePageModule {}
