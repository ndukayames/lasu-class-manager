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
  type; //variable used to check against the ngSwitch function on the html page, type can be student or lecturer
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
    if(!this.matric_number){
      this.presentToast("Your matric number is required")
    }
    else if(!this.password){
      this.presentToast("Your password is required")
    }
    else{
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
      await this.storage.clear();
      this.prvdr.lecturer_login(this.user_name, this.password);
    }
  }
 async  ngOnInit() {
    this.type = 'student'
    let token = await this.storage.get('access_token');
  }
  segment(ev){
    //this function takes the value from the segment component and set it as the type value, segment value is either student or lecturer
    this.type = ev.detail.value
    console.log(this.type)
  }

}
