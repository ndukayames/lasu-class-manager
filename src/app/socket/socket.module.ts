import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocketPageRoutingModule } from './socket-routing.module';

import { SocketPage } from './socket.page';
// import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

// const config: SocketIoConfig = { url: 'http://localhost:3001/my-namespace', options: {} };

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocketPageRoutingModule,
    // SocketIoModule.forRoot(config)
  ],
  declarations: [SocketPage]
})
export class SocketPageModule {}
