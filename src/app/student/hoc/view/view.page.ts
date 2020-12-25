import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/shared/provider.service';
import { Storage } from '@ionic/storage';
import * as moment from 'moment'

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
course;
title = this.activatedRoute.snapshot.paramMap.get("courseCode")
courseData = [];
class_started:boolean
classID; //stores class id from ongoing classes online
selectedLecturer
myDeptCourse:boolean; //used to check if the viewed course belongs to the HOC
endTime: string | number | Date;

async schedule(){
  if(!this.endTime && !this.selectedLecturer){
    this.prvdr.doToast("some fields are empty","bottom",2000)
  }else{
    let token =  await this.storage.get('login_access_token')
  //schedule a class
    let endDate:any = new Date(this.endTime).getHours()
    let newStartDate = new Date(this.courseData[0].course_time).getHours()
    let duration:any =  endDate - newStartDate + 'hours'
    this.courseData[0].duration = duration
    this.courseData[0].event = 'started'
    if(Math.sign(endDate - newStartDate) === -1 || endDate - newStartDate === 0){
      console.log(endDate - newStartDate)
      this.prvdr.doToast("Class Duration Should Be At Least 1hour","bottom",2000)
    }else{
      let datass = await this.storage.get('stud_loggedin_data')
      this.classID = this.courseData[0].course_code + '/' + moment().dayOfYear() + '/' + moment().year();
      let body = {
        function: 'set_class',
        course_code: this.courseData[0].course_code,
        course_title: this.courseData[0].course_title,
        duration: duration,
        hoc:  this.courseData[0].hoc_name,
        level: this.courseData[0].level,
        department: this.courseData[0].my_hoc_department,
        lecturers: this.selectedLecturer,
        date_started: moment().format("YYYY-MM-DDTHH:mm.SSSZ"),
        matric_number: datass.matric_number,
        class_id: this.classID
      }
      console.log(body)
      let request:any = await this.prvdr.dbops.postData(token,body,'api.php').toPromise()
      if(request===null){
        console.log('error reaching server')
      }else{
        if(request.success ===true){
          console.log(endDate - newStartDate)
          this.prvdr.route.navigateByUrl('student-profile-tab/profile')
        }else{
          this.prvdr.doToast(request.msg,'bottom',2000)
        }
      }
    }
  }
}

async join_class(){
  let checker = await this.prvdr.get_ongoing_class_details(this.course)
  console.log(checker)
  if(checker){
    this.prvdr.hoc_join_class(this.course)
  }
}

  constructor(private activatedRoute:ActivatedRoute, private prvdr: ProviderService, private storage:Storage) { }

  async isClassOn(){
    let finder = await this.prvdr.get_ongoing_classID(this.course)
    if(finder){
      this.class_started = true
    }else{
      this.class_started = false
    }
    console.log(this.myDeptCourse)
  }
  
  ngOnInit() {}
  
  async ionViewWillEnter(){
    this.course = this.activatedRoute.snapshot.paramMap.get("courseCode") //get the course code of the selected course
    let student_data = await this.storage.get('stud_loggedin_data')
    let all_student_course_data = await this.storage.get('hoc_course_data');
    let courseData = all_student_course_data.find(res=>{
      return res.course_code === this.course
    })
    if(courseData.isItDept){
      this.myDeptCourse = true;
    }else{
      this.myDeptCourse = false;
    }
    this.courseData.push(courseData);
    await this.isClassOn()
    console.log(this.class_started,this.myDeptCourse,this.course)
    console.log(this.myDeptCourse)
  }
}
