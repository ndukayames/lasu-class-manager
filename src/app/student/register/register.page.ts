import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController, LoadingController, Platform } from '@ionic/angular';
import { DbopsService } from 'src/app/shared/dbops.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  selectedCampu(){
    console.log(this.selectedCampus)
    this.faculties = this.prvdr.getFaculty(this.selectedCampus)
    console.log(this.faculties)
  }
  selectedFacult(){
    this.departments = this.prvdr.getDepartment(this.selectedCampus, this.selectedFaculty);
    console.log(this.departments)
  }
full_name:string;
matric_number:number;
password:string;
campuses;

selectedCampus;
lectid;
selectedLectid;
faculties;
selectedFaculty;
departments;
selectedDepartment;
course;
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

  constructor(private toastCtrl:ToastController, private loadingCtrl:LoadingController, private dbops: DbopsService, private route:Router, private device:Device, private platform: Platform, private prvdr:ProviderService ) {}
  type = 'student';
  ionViewWillEnter() {
    // this.type = 'student'
    // this.campuses = this.prvdr.getAllCampus()   
  }
  ngOnInit(){}
  segment(ev){
    this.type = ev.detail.value;
  }

}
