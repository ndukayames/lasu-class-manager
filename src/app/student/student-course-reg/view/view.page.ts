import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from 'src/app/shared/provider.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  @Input() course: any;
  courseData = []
  constructor(private prvdr:ProviderService, private activatedRoute:ActivatedRoute, private storage:Storage, private modalCtrl:ModalController) { }

  ngOnInit() {
    
  }
  close() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async ionViewWillEnter(){
    let student_course_data = await this.storage.get('student_course_data');
    let courseData = await student_course_data.find(res=>{
      return res.course_code === this.course
    })
    this.courseData.push(courseData);
    console.log("course data",this.courseData,this.course)
  }
}
