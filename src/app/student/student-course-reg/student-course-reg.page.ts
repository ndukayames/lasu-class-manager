import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProviderService } from 'src/app/shared/provider.service';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { ViewPage } from './view/view.page';

@Component({
  selector: 'app-student-course-reg',
  templateUrl: './student-course-reg.page.html',
  styleUrls: ['./student-course-reg.page.scss'],
})
export class StudentCourseRegPage implements OnInit {

  constructor(private prvdr:ProviderService, private modalController: ModalController, private routerOutlet:IonRouterOutlet) { }
  
  available_courses;
  thereAreNoCourses = false;
  btn_color = 'danger'
  add_color = 'dark'
  view_color = 'medium'
  selected_course = [];

    async add(ev,courseCode){
      if(this.selected_course.includes(courseCode)){
        this.selected_course  = this.selected_course.filter(res=>{
          return res !== courseCode
        })
        console.log(this.selected_course)
        ev.target.color = "dark"
      }
      else{
        ev.target.color = "success"
        this.selected_course.push(courseCode)
      }
  }
    complete(){
      if(this.selected_course.length < 1){
        this.prvdr.doToast("You haven't selected any course", "middle", 2000)
      }else{
        this.prvdr.register_course(this.selected_course.toString());
      this.selected_course = [];
      }
      
    }

  async ngOnInit() {}
  async open(courseCode){
    const modal = await this.modalController.create({
      component: ViewPage,
      swipeToClose: true,
    presentingElement: this.routerOutlet.parentOutlet.nativeEl,
      componentProps: {
        'course' : courseCode
      }
    });
    return await modal.present();
  }
  
  async ionViewWillEnter(){
    let student_course_data = await this.prvdr.get_student_course()
    console.log(student_course_data)
    this.available_courses = student_course_data
    if(student_course_data === null || student_course_data === ""){
      this.thereAreNoCourses = true;
    }
  }
}
