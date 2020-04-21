import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { ProviderService } from 'src/app/shared/provider.service';

@Component({
  selector: 'app-hoc',
  templateUrl: './hoc.page.html',
  styleUrls: ['./hoc.page.scss'],
})
export class HocPage implements OnInit {
classes = [];
  constructor(private route:Router, private storage:Storage, private navCtrl:NavController, private pvdr:ProviderService) { }
  gotoCreate(){
    this.navCtrl.navigateForward('/student-profile-tab/hoc/create-semester-class');
  }
  ngOnInit() {
  }
  delete(courseCode){
    this.classes = this.classes.filter(course_code=>{
      return course_code.course_code !== courseCode;
    })
    this.pvdr.delete_course(courseCode)
  }
  async ionViewWillEnter(){
    let data = await this.pvdr.fetch_course_data()
    console.log(data)
    let a = await this.pvdr.get_student_login_data()
    console.log(a)
    this.classes = data;
  }
}
