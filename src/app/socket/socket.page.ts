import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DbopsService } from '../shared/dbops.service';
// import { Socket } from 'ngx-socket-io';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ProviderService } from '../shared/provider.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Socket } from 'ngx-socket-io';

export function tokenGetter() {
  
  return localStorage.getItem("access_token");
  
}

@Component({
  selector: 'app-socket',
  templateUrl: './socket.page.html',
  styleUrls: ['./socket.page.scss'],
})
export class SocketPage implements OnInit {
  message = '';
  messages = [];
  currentUser = '';
  constructor(private socket: Socket) { }
  async testSocket(){
    this.socket.emit('test_socket_connection')
    console.log('testing connextion ...')
  }
  async ngOnInit() {
    this.socket.fromEvent('connection_status').subscribe(res=>{
      console.log(res)
    })
  }
}

