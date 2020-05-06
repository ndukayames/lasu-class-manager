import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { DbopsService } from 'src/app/shared/dbops.service';
import { Router } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { ProviderService } from 'src/app/shared/provider.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  gotoStudLogin(){
    this.route.navigateByUrl('/home/login') 
  }
full_name:string;
matric_number:number;
password:string;

lectid;
selectedLectid;
async presentToast(msg){
  const toast = await this.toastCtrl.create({
    message: msg,
    duration: 2000
  });
  toast.present()
}
  async stud_register(){
    console.log("register working")
    if(!this.full_name){
      this.presentToast("Your full name is required")
    }
    else if(!this.matric_number){
      this.presentToast("Your matric number is required")
    }
    else if(!this.password){
      this.presentToast("Your password is required")
    }
    else{
      this.prvdr.stud_register(this.full_name,this.matric_number,this.password)
    }
  }
  async lect_register(){
    console.log("register working")
    if(!this.lectid){
      this.presentToast("Your username is required")
    }
    else if(!this.password){
      this.presentToast("Your password is required")
    }
    else if(!this.full_name){
      this.presentToast("Your full name is required")
    }
    else{
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
        duration: 2000
      });
      await loading.present(); 
      return new Promise(resolve=>{
        let body={
          function : 'lect_register',
          full_name : this.full_name,
          user_name: this.lectid,
          password: this.password,
        }
        this.dbops.postData(body, 'api.php').subscribe((res:any)=>{
          if(res.success === true){
              loading.dismiss();
              this.prvdr.get_lecturer_data()
              this.presentToast(res.msg);
              this.route.navigateByUrl('home/login')

          }else{
            loading.dismiss();
            this.presentToast(res.msg)
          }
        },
        (err)=>{
          this.presentToast("timeout")
          console.log("eror")
        }
        )
      })
    }
  }

  constructor(private toastCtrl:ToastController, private loadingCtrl:LoadingController, private dbops: DbopsService, private route:Router, private prvdr:ProviderService ) {}

  type = 'student';
  ngOnInit(){}
  segment(ev){
    this.type = ev.detail.value;
  }

}
