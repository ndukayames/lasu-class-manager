import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ProviderService } from 'src/app/shared/provider.service';
import { PopoverController, DomController, ModalController } from '@ionic/angular';
import { MoreDetailsComponent } from './more-details/more-details.component';
import * as moment from 'moment';
import { element } from 'protractor';
import { ClassMoreDetailsComponent } from './class-more-details/class-more-details.component';
import { LecClassHistoryComponent } from './class-history/lect-class-history.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {
  fixedc = false
  isOngoingClass = false
  is_Next_lecture = false
  next_class = []
  next_lecture = []
  constructor(private prvdr:ProviderService, private modalController: ModalController) { }
  ongoingclass:any[] = []
   myUniqueCourses:any[]
  public tests = new Array(20);
  ngOnInit() {}
  async moreDetails(courseCode,courseTitle){
    const modal = await this.modalController.create({
      component: ClassMoreDetailsComponent,
      componentProps: {
        courseCode,courseTitle
      }
    });
    return await modal.present();
  }

  cancelClass(courseCode){
    console.log(courseCode)
    this.prvdr.cancelLecClass(courseCode)
    this.ionViewWillEnter()
  }
  endClass(courseCode){
    this.prvdr.endLecClass(courseCode)
    this.ionViewWillEnter()
  }
  async ionViewWillEnter() {
    const loading = await this.prvdr.loadingCtrl.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present();
    let d = new Date();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    this.ongoingclass = await this.prvdr.get_lecturer_ongoing_courses()
    if(this.ongoingclass === null){
      this.myUniqueCourses = await this.prvdr.storage.get('unique_lecturers_courses')
      this.myUniqueCourses.forEach(courses=>{
        console.log(this.ongoingclass)
        console.log(courses)
        let toDay = days[d.getDay()]
        let tIME = moment(d).format("HH:mm")
        let course_day = days[moment(courses.course_time).day()]
        let course_time = moment(courses.course_time).format("HH:mm")
        if(toDay === course_day && course_time > tIME){
          this.next_class.push(courses)
          this.next_lecture = [this.next_class[0]]
        if(this.next_lecture === null){
          this.is_Next_lecture = false
        }else{
          this.is_Next_lecture = true
          console.log(this.next_lecture)
      }
        }
      })
      
    }else{
      console.log(this.ongoingclass)
      this.ongoingclass.forEach(element =>{
        this.isOngoingClass  = true
        if(element.event === "0"){
          element.status = "started"
        }else if(element.event === 1){
          element.status = "Ended"
        }else{
          element.status = "canceled"
        }
      })
      this.ongoingclass = this.ongoingclass.filter(ressponse=>{
        return ressponse.event === "0"
      })
    }
    this.myUniqueCourses = await this.prvdr.storage.get('unique_lecturers_courses')
    await loading.dismiss()
  }
  async openclasshistory(courseCode){
    let data = await this.prvdr.storage.get('lecturer_academic_data')
    let datas= await this.prvdr.storage.get('loggedin_lecturer_data')
    const modal = await this.modalController.create({
      component: LecClassHistoryComponent,
      componentProps: {
        courseCode: courseCode,
        department: data.department,
        lecturer: datas.full_name
      }
    });
    return await modal.present();
  }
  ionViewWillLeave(){
    this.next_class.length = 0
    this.is_Next_lecture = false
    this.isOngoingClass = false;
  }   
}