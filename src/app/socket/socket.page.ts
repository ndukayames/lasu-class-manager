import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DbopsService } from '../shared/dbops.service';
// import { Socket } from 'ngx-socket-io';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ProviderService } from '../shared/provider.service';
import { JwtHelperService } from "@auth0/angular-jwt";

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
  constructor(private toastCtrl: ToastController,private http: HttpClient, private dbops:DbopsService, private storage:Storage, private prvdr:ProviderService, private jwt:JwtHelperService) { }

  async ngOnInit() {
    let a  = await this.storage.get('login_access_token')
      console.log(a)
  }
  // async getToken(){
  //   await this.prvdr.get_stud_data()
  // }
  // async validateToken(){
  //   let token =  await this.storage.get('login_access_token')
  //   let a = await this.storage.get('access_token')
  //   const decodedToken = this.jwt.isTokenExpired(a);
  //   console.log('decodedToken',decodedToken)
  //   let body = {
  //     function: 'testjwt',
  //     token: a
  //   }
  //  this.dbops.postData(token,body,'api.php').then(res=>{
  //    console.log(res)
  //  }).catch(error=>{
  //    console.log(error)
  //  }).finally(()=>console.log('finally'))
  // }
}

