import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbopsService } from 'src/app/shared/dbops.service';
import { Storage } from '@ionic/storage';
import { ProviderService } from 'src/app/shared/provider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  type;
  user_name: any;
    constructor(
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private dbops: DbopsService,
      private route: Router,
      private storage: Storage,
      private prvdr: ProviderService,
    ) { }

matric_number:number;
password:string;
async presentToast(msg){
  const toast = await this.toastCtrl.create({
    message: msg,
    duration: 2000
  });
  toast.present()
}
  async stud_login(){
    console.log("login working")
    if(!this.matric_number){
      this.presentToast("Your matric number is required")
    }
    else if(!this.password){
      this.presentToast("Your password is required")
    }
    else{
     await this.storage.clear();
     this.prvdr.stud_login(this.matric_number,this.password)
    }
  }
  async lect_login(){
    console.log("login working")
    if(!this.user_name){
      this.presentToast("Your username is required")
    }
    else if(!this.password){
      this.presentToast("Your password is required")
    }
    else{
      this.prvdr.lecturer_login(this.user_name, this.password);
    }
  }
 async  ngOnInit() {
    this.type = 'student'
  }
  segment(ev){
    this.type = ev.detail.value
    console.log(this.type)
  }

}
