import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HocPageRoutingModule } from './hoc-routing.module';

import { HocPage } from './hoc.page';
import { SocketIoConfig } from 'ngx-socket-io';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HocPageRoutingModule
  ],
  declarations: [HocPage]
})
export class HocPageModule {}
