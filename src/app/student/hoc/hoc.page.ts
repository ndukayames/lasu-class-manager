import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProviderService } from 'src/app/shared/provider.service';

@Component({
  selector: 'app-hoc',
  templateUrl: './hoc.page.html',
  styleUrls: ['./hoc.page.scss'],
})
export class HocPage implements OnInit {
classes = [];
departmentCourse = true

  constructor(private navCtrl:NavController, private pvdr:ProviderService) { }
  testObj = []
  gotoCreateNonDept(){
    this.pvdr.notDepartmentCourse = true;
    this.navCtrl.navigateForward('/student-profile-tab/hoc/create-semester-class');
  }
  gotoCreate(){
    this.pvdr.notDepartmentCourse = false;
    this.navCtrl.navigateForward('/student-profile-tab/hoc/create-semester-class');
  }
  gotoCreateClass(courseCode){
    this.navCtrl.navigateForward('/student-profile-tab/hoc/create-class/courseCode');
}
  ngOnInit() {
  }
  delete(courseCode,hoc_department){
    this.classes = this.classes.filter(course_code=>{
      return course_code.course_code !== courseCode;
    })
    this.pvdr.delete_course(courseCode,hoc_department)
  }
  async ionViewWillEnter(){
    let data = await this.pvdr.fetch_course_data()
    console.log(data)
    data.filter(res=>{
      if(res.my_hoc_department == res.original_course_department){
        res.isItDept = true
      }else{
        res.isItDept = false
      }
    })
    
    console.log(data)
    let a = await this.pvdr.get_student_login_data()
    this.classes = data;
  }
}
