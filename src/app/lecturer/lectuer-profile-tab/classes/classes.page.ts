import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ProviderService } from 'src/app/shared/provider.service';
import { PopoverController, DomController } from '@ionic/angular';
import { MoreDetailsComponent } from './more-details/more-details.component';
import * as moment from 'moment';
import { element } from 'protractor';

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
  constructor(private prvdr:ProviderService, private popoverController: PopoverController) { }
  ongoingclass:any[] = []
   myUniqueCourses:any[]
  public tests = new Array(20);
  ngOnInit() {}
  async moreDetails(ev){
    const popover = await this.popoverController.create({
      component: MoreDetailsComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  
  async ionViewWillEnter() {
    let d = new Date();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    this.ongoingclass = await this.prvdr.get_lecturer_ongoing_courses()
    if(this.ongoingclass === null){
      this.myUniqueCourses = await this.prvdr.storage.get('unique_lecturers_courses')
      this.myUniqueCourses.forEach(courses=>{
        console.log(courses)
        let toDay = days[d.getDay()]
        let tIME = moment(d).format("HH:mm")
        let course_day = days[moment(courses.course_time).day()]
        let course_time = moment(courses.course_time).format("HH:mm")
        if(toDay === course_day && course_time > tIME){
          this.next_class.push(courses)
        }
      })
      this.next_lecture = [this.next_class[0]]
      if(this.next_lecture === null){
        this.is_Next_lecture = false
      }else{
        this.is_Next_lecture = true
      }
      console.log(this.next_lecture)
    }else{
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
      this.myUniqueCourses = await this.prvdr.storage.get('unique_lecturers_courses')
    }
    
  }
  ionViewWillLeave(){
    this.next_class.length = 0
  }   
}