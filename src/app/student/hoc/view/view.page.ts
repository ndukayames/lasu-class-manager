import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/shared/provider.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
course;
title = this.activatedRoute.snapshot.paramMap.get("courseCode")
courseData = [];
selectedLecturer
endTime: string | number | Date;

async schedule(){
  //schedule a class
  let endDate:any = new Date(this.endTime).getHours()
  let newStartDate = new Date(this.courseData[0].course_time).getHours()
  let duration =  endDate - newStartDate + 'hours'
  this.courseData[0].duration = duration
  this.courseData[0].event = 'started'
  let body = {
    function: 'set_class',
    course_code: this.courseData[0].course_code,
    course_title: this.courseData[0].course_title,
    duration: duration,
    hoc:  this.courseData[0].hoc_name,
    level: this.courseData[0].level,
    department: this.courseData[0].my_hoc_department,
    lecturers: this.selectedLecturer,
    date_started: new Date(),
  }
  let request:any = await this.prvdr.dbops.postData(body,'api.php').toPromise()
  if(request===null){
    console.log('error reaching server')
  }else{
    if(request.success ===true){
      console.log(request.msg)
      this.prvdr.route.navigateByUrl('student-profile-tab/profile')
    }else{
      console.log(request.msg)
      this.prvdr.doToast(request.msg,'bottom',2000)
    }
  }
}
  constructor(private activatedRoute:ActivatedRoute, private prvdr: ProviderService, private storage:Storage) { }
  
  ngOnInit() {}
  async ionViewWillEnter(){
    this.course = this.activatedRoute.snapshot.paramMap.get("courseCode")
    let all_student_course_data = await this.storage.get('hoc_course_data');
    let courseData = all_student_course_data.find(res=>{
      return res.course_code === this.course
    })
    this.courseData.push(courseData);
  }
}
