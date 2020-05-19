import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/shared/provider.service';
import { DbopsService } from 'src/app/shared/dbops.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AbstractExtendedWebDriver } from 'protractor/built/browser';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
campuses = []
selectedCampus ;
faculties = []
selectedFaculty ;
departments = []
selectedDepartment;
fdis = true;
ddis = true;
matric_number;
password: any = '';
full_name = '';
level;
 
  constructor(
    private prvdr       :ProviderService,
    private storage     : Storage, 
    private toastCtrl   : ToastController, 
    ){
      this.campuses = this.prvdr.getAllCampus();
    }
  getFaculties(){
    this.faculties  = this.prvdr.getFaculty(this.selectedCampus);   
  }
  getDepartment(){
    this.departments = this.prvdr.getDepartment(this.selectedCampus, this.selectedFaculty)
  }
  async presentToast(msg){
    const toast  = await this.toastCtrl.create({
      message   : msg,
      duration  : 2000
    });
    toast.present()
  }
  
  async ngOnInit() {
    let aa = await this.storage.get('stud_loggedin_data')
    console.log(aa)
    this.matric_number      = aa.matric_number;
    this.full_name          = aa.full_name;
    this.password           = aa.password;
    this.selectedCampus     = aa.campus;
    this.selectedFaculty    = aa.faculty;
    this.selectedDepartment = aa.department;
    this.level              = aa.level;
  }

  async stud_profile_update(){
    console.log(this.password)
    console.log("process started")
    if(!this.matric_number||!this.full_name||!this.password||!this.selectedCampus||!this.selectedFaculty||!this.selectedDepartment||!this.level){
      this.presentToast("Some fields are probably empty")
    }else{
      this.prvdr.update_stud_data(this.full_name,this.matric_number,this.password,this.selectedCampus,this.selectedFaculty,this.selectedDepartment,this.level); 
    }
  }
}