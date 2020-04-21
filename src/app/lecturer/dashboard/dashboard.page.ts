import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/shared/provider.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  data;
  campuses
  selectedCampus
  selectedFaculty
  selectedDepartment
  faculties = []
  departments = []
  user_name;
  courseList = []
  inputCourse;
  incomplete_profile = true;
  getFaculties(){
    this.faculties = this.prvdr.getFaculty(this.selectedCampus)
    console.log(this.faculties)
  }
  getDepartments(){
    this.departments = this.prvdr.getDepartment(this.selectedCampus,this.selectedFaculty)
  }
  completeProfile(){
    this.prvdr.complete_lecturer_signup(this.selectedCampus,this.selectedFaculty,this.selectedDepartment,this.courseList.toString())
    console.log(this.selectedCampus,this.selectedFaculty,this.selectedDepartment,this.courseList.toString())
  }
  ionChange(ev){
    if(ev.key=="Enter"||ev.code=="Enter"){
      if(!this.inputCourse){
        //do nothing
        this.prvdr.doToast("please enter a course", "bottom", 2000)
        this.courseListIsNotEmpty = false
      }else{
        this.courseList.push(this.inputCourse)
        this.courseListIsNotEmpty = true;
        this.inputCourse = ''
      }
    }
  }
  courseListIsNotEmpty = false
  constructor(private storage: Storage, private route:Router, private prvdr:ProviderService) { }
  logout(){
    this.storage.clear()
    this.route.navigateByUrl('home/login')
  }
  async ngOnInit() {
    this.campuses = this.prvdr.getAllCampus();
    this.data = await this.storage.get('lecturer_academic_data')
    
  }
  async ionViewWillEnter(){
    await this.prvdr.get_lecturer_data();
    this.data = await this.storage.get('lecturer_academic_data')
    if(this.data.complete === "1"){
      this.incomplete_profile = false;
    }
    else if(this.data.complete === null){
      this.incomplete_profile = true;
    }
    console.log('lecturer_academic_data',this.data)
    let a = await this.storage.get('loggedin_lecturer_data')
    console.log(a)
    this.user_name = a.user_name
  }
}