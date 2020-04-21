import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/shared/provider.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  constructor(
    private prvdr:ProviderService,
    private storage:Storage
  ) { }
  async update(){
    if(!this.user_name||!this.selectedCampus||!this.selectedFaculty||!this.selectedDepartment){
      this.prvdr.doToast("some fields are empty","bottom",2500)
    }else{
      this.prvdr.update_lecturer_profile(this.user_name,this.selectedCampus,this.selectedFaculty,this.selectedDepartment)
    }
  }
  getFaculties(){
    this.faculties = this.prvdr.getFaculty(this.selectedCampus)
    console.log(this.faculties)
  }
  getDepartments(){
    this.departments=  this.prvdr.getDepartment(this.selectedCampus,this.selectedFaculty)
  }
  user_name;password;campuses;selectedCampus;faculties;selectedFaculty;departments;selectedDepartment
  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.campuses = this.prvdr.getAllCampus()
    let login_data = await this.storage.get('loggedin_lecturer_data')
    let academic_data = await this.storage.get('lecturer_academic_data')
    console.log(login_data,academic_data)
    this.user_name = login_data.user_name;
    this.password = login_data.password;
    this.selectedCampus = academic_data.campus;
    this.selectedFaculty = academic_data.faculty;
    this.selectedDepartment = academic_data.department;
  }
}
