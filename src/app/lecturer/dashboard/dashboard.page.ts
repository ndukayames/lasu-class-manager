import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/shared/provider.service';
import { Storage } from '@ionic/storage';
import * as moment from 'moment'


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
  incomplete_profile;
  rows = []



  myUniqueCourses = [];
  getFaculties(){
    this.faculties = this.prvdr.getFaculty(this.selectedCampus)
    console.log(this.faculties)
  }
  getDepartments(){
    this.departments = this.prvdr.getDepartment(this.selectedCampus,this.selectedFaculty)
  }
  async completeProfile(){
    this.prvdr.complete_lecturer_signup(this.selectedCampus,this.selectedFaculty,this.selectedDepartment)
    console.log(this.selectedCampus,this.selectedFaculty,this.selectedDepartment,this.courseList.toString())
    await this.prvdr.checkLecuturerProfile()
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
    await this.prvdr.checkLecuturerProfile()
    this.incomplete_profile = this.prvdr.incomplete_profile;
    let a = await this.storage.get('loggedin_lecturer_data')
    this.user_name = a.user_name
    this.myUniqueCourses = await this.storage.get('unique_lecturers_courses')
    this.myUniqueCourses.forEach(element =>{
      let {class_day,course_code,course_time} = element
      course_time = moment(course_time).format('hh:mm a')
      this.rows.push({class_day,course_code,course_time})
      this.rows = [...this.rows]
    })
  }
  ionViewWillLeave(){
    this.rows.length = 0
  }
}
