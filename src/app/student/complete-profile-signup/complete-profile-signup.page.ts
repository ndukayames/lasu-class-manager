import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/shared/provider.service';
import { DbopsService } from 'src/app/shared/dbops.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-profile-signup',
  templateUrl: './complete-profile-signup.page.html',
  styleUrls: ['./complete-profile-signup.page.scss'],
})
export class CompleteProfileSignupPage implements OnInit {
  campuses = []
  selectedCampus ;
  faculties = []
  selectedFaculty ;
  departments = []
  selectedDepartment;
  level: any;
  matric_number: any;

  async presentToast(msg){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present()
  }
  getFaculties(){
    let temp  = this.prvdr.getFaculty(this.selectedCampus);
    this.faculties = temp    
  }
  getDepartment(){
    this.departments = this.prvdr.getDepartment(this.selectedCampus, this.selectedFaculty)
  }

  async stud_profile_update(){
    let token =  await this.storage.get('login_access_token')
    console.log("process started")
    let xy:any = await this.prvdr.get_student_login_data();
    this.matric_number = xy.matric_number;
    console.log("process started", this.matric_number)
    if(!this.selectedCampus||!this.selectedFaculty||!this.selectedDepartment||!this.level){
      this.presentToast("Some fields are probably empty")
    }else{
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
        duration: 2000
      });
      await loading.present(); 
      return new Promise(resolve=>{
        let body={
          function : 'complete_profile',
          matric_number: this.matric_number,
          campus:this.selectedCampus,
          faculty: this.selectedFaculty,
          department: this.selectedDepartment,
          level:this.level,
          complete_profile: 1
        }
        this.dbops.postData(token,body, 'api.php').subscribe((res:any)=>{
          if(res.success === true){
              loading.dismiss();
              this.presentToast(res.msg);
              
              this.route.navigateByUrl('student-profile-tab/profile')

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

  constructor(private prvdr:ProviderService, private dbops:DbopsService,  private toastCtrl: ToastController, private storage: Storage, private route:Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.campuses = this.prvdr.getAllCampus();
  }
  async ionViewWillEnter(){
   
  }
}
