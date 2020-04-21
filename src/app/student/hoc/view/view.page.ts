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
courseData:string[] = [];
  constructor(private activatedRoute:ActivatedRoute, private prvdr: ProviderService, private storage:Storage) { }
  getCourseData(course){

  }
  ngOnInit() {}
  async ionViewWillEnter(){
    this.course = this.activatedRoute.snapshot.paramMap.get("courseCode")
    let all_student_course_data = await this.storage.get('hoc_course_data');
    let courseData = await all_student_course_data.find(res=>{
      return res.course_code === this.course
    })
    this.courseData.push(courseData);
    console.log("course data",this.courseData)
  }
}
