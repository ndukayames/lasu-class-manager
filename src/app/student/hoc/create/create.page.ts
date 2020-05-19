import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/shared/provider.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  course_title;
  course_code;
  class_date;
  selected_class_lecturer:string[]; //selected lecturers are stored here
  hoc_department_lecturer = []; //holds lecturer's in hoc department
  class_lecturers_string //hold strings version of the selected_class_lecturer variable,w hich will be sent to the server
  class_hoc;
  deparment;
  matric_number;
  notDepartmentCourse = this.prvdr.notDepartmentCourse//checkbox value, if the registration process is for in house course or not
  campuses;selectedCampus;faculties;selectedFaculty;departments;selectedDepartment;
  non_dept_courses = [] //holder for non departmental courses

  constructor(
    private prvdr:ProviderService,
    private storage:Storage, 
    private toastCtrl:ToastController) {
      this.campuses = this.prvdr.getAllCampus();
    }
  class_day;
  class_days=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  
  async presentToastWithOptions(m) {
    const toast = await this.toastCtrl.create({
      header: 'Toast header',
      message: m,
      position: 'top',
      color: 'medium',
      duration: 2000
    });
    toast.present();
  }
  loading
  
async createClass(){
  if(this.notDepartmentCourse === true){
    //This functions creates a new course
    //Creates a new course to the registered_courses table if the course is a department course
    //Creates a new course instance of another course if the registration is for another department course
    if(!this.selectedCourseData){
      
    }else{
      this.prvdr.hoc_non_dept_course_reg(this.class_hoc,this.deparment,this.selectedCourseData[0].department,this.selectedCourseData[0].class_day,this.selectedCourseData[0].class_time,this.selectedCourseData[0].course_lecturer.toString(),this.selectedCourseData[0].course_code,this.selectedCourseData[0].course_title)
    }
      
  }else{
    this.class_lecturers_string = this.selected_class_lecturer.toString()
    if(!this.course_title||!this.course_code||!this.class_date||this.class_date === "Invalid Date"||!this.class_lecturers_string||!this.class_day){
      this.prvdr.loadingCtrl.dismiss();
      this.presentToastWithOptions("some fields are empty")
    }else{
      console.log(this.notDepartmentCourse,this.class_date)
      this.prvdr.hoc_course_reg(this.course_code,this.course_title,this.class_date,this.class_lecturers_string,this.class_hoc,this.deparment,this.class_day,this.matric_number)
      this.prvdr.loadingCtrl.dismiss();
    }
  }
}
selected_course;selectedCourseData

get(ev){
  //get the non department course to register
  this.selectedCourseData = this.non_dept_courses.filter(res=>{
    return res.course_code === this.selected_course
  })
}

getFaculties(){
  this.faculties = this.prvdr.getFaculty(this.selectedCampus)
}
getDepartments(){
  this.departments = this.prvdr.getDepartment(this.selectedCampus,this.selectedFaculty)
}
async get_non_department_courses(){
  console.log(this.selectedDepartment)
  this.non_dept_courses = await this.prvdr.get_non_department_courses(this.selectedDepartment);
  console.log("isn this wfunsd",this.non_dept_courses)
}

  ngOnInit() {}

  async ionViewWillEnter(){
    let a = await this.storage.get('stud_loggedin_data')
    this.class_hoc      = a.full_name
    this.deparment      = a.department
    this.matric_number  = a.matric_number
    await this.prvdr.get_hoc_lecturer(this.deparment)
    let hoc_lecturers = await this.storage.get('hoc_lecturers')
    if(hoc_lecturers === null) {
    }
    this.hoc_department_lecturer = hoc_lecturers
  }
}
