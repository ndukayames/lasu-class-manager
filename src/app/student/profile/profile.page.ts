import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, ModalController, IonRouterOutlet, IonItemSliding } from '@ionic/angular';
import { ProviderService } from 'src/app/shared/provider.service';
import { ViewPage } from '../student-course-reg/view/view.page';
import * as moment from 'moment'
import * as _ from 'lodash'
import { Socket } from 'ngx-socket-io';
import { OngoingClassComponent } from './ongoing-class/ongoing-class.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('mysliding',{static:false}) private myslid:IonItemSliding
  
  data;
  name = '';
  rows:any[] = []
  isRegisteredCourses = false // checks if student has registered courses
  inCompleteProfile = true; // 
  isOngoingClass = false // check if there's any ongoing classes
  hoc = true;
  onGoingClasshoc = []
  registered_courses;
  onGoingClasses = []
  matric_number: any;
  ogc: any[] = [];
  inClass: boolean;
  inClassStatus: string;
  constructor(
    private storage: Storage,
    private menuController: MenuController, 
    private prvdr:ProviderService,
    private  modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private socket: Socket
    ){}

  async ngOnInit(){
        this.socket.fromEvent('joined_classroom').subscribe((res:any)=>{
          this.prvdr.doToast("Joined Class with #ID ","bottom",2000)
        })
        this.socket.fromEvent('left_class').subscribe((res:any)=>{
          this.prvdr.doToast("You left the class at " + res.timeleft, "middle",2000)
        })
        this.socket.fromEvent('class_ended').subscribe((res:any)=>{
          console.log(res)
          this.ogc.forEach(courses=>{
            if(courses.course_code === res.courseCode && res.hoc === courses.hoc){
              this.prvdr.doToast(res.courseCode + " ended","bottom",2000)
              this.getOngoingClass()
            }
          })
          this.check_if_in_class()
        })
  }

  async presentModal(courseCode) {
    let ongc = await this.storage.get('ongoingclass2')
    ongc = ongc.filter(res=>{
      return res.course_code === courseCode
    })
    const modal = await this.modalController.create({
      component: OngoingClassComponent,
      componentProps: {
        'ogc': ongc,
        'hoc': this.hoc,
        swipeToClose: true,
        presentingElement: this.routerOutlet.nativeEl
      }
    });
    return await modal.present();
  }

  async joinClass(Hoc,courseCode){

    let datass = await this.storage.get('stud_loggedin_data');
    let class_mark = {
      matric_number: datass.matric_number,
      full_name : datass.full_name,
      department: datass.department,
      courseCode,
      Hoc
    }
    this.socket.emit('join_class',class_mark)
    this.myslid.closeOpened()
    this.prvdr.socket.emit('check_if_in_class',datass.matric_number,(courseCode))
    this.inClass = true;
    return class_mark;
   }

   leaveClass(courseCode){
     this.prvdr.leaveClass(courseCode)
     this.check_if_in_class()
     this.myslid.closeOpened()
   }

   async endClass(hoc,courseCode){
     this.prvdr.endClass(hoc,courseCode)     
     this.myslid.closeOpened()
    //  this.getOngoingClass()
   }

  async logout(){
    this.prvdr.stud_logout()
  }

  async check_if_in_class(){
    let datas:any = await this.storage.get('stud_loggedin_data')
    let ongc = await this.storage.get('ongoingclass')
        ongc.forEach(element=>{
          this.prvdr.socket.emit('check_if_in_class',datas.matric_number,(element.course_code))
        })
        this.socket.fromEvent('checked_if_in_class').subscribe((response:any)=>{
          if(response.status === "present"){
            this.ogc.forEach(async element => {
              if(element.course_code === response.class){
                element.joined = true;
              }
              await this.storage.set('ongoingclass2',this.ogc)
            });
          }else if(response.status === "absent") {
            this.ogc.forEach(async elements => {
              if(elements.course_code === response.class){
                elements.joined = false;
                this.modalController.dismiss({
                  'dismissed': true
                });
              }
              await this.storage.set('ongoingclass2',this.ogc)
            });
          }else if(response.status === "class not started"){
            this.ogc.forEach(async elements => {
              if(elements.course_code === response.class){
                elements.joined = false;
                this.modalController.dismiss({
                  'dismissed': true
                });
              }
              await this.storage.set('ongoingclass2',this.ogc)
            });
          }
          
        })
  }
  
  async getOngoingClass(){
    this.ogc = []
    this.onGoingClasses = await this.prvdr.get_classes()
    console.log(this.onGoingClasses)
    this.registered_courses.forEach(course=>{
      let onGoingClasses = this.onGoingClasses.filter(res=>{
        return res.course_code === course
      })
      this.ogc.push(...onGoingClasses)
      if(this.ogc.length !== 0){
        console.log(this.ogc)
        this.isOngoingClass = true;
      }else{
        this.isOngoingClass = false;
      }
    })
  }
  async ionViewWillEnter(){
    let datas:any = await this.storage.get('stud_loggedin_data')
    this.name = datas.full_name;
    this.matric_number = datas.matric_number
    if(datas.complete_profile==='1'){
      this.inCompleteProfile = false;
    }
    if(datas.type !== 'hoc'){
      this.hoc = false;
    }
    this.menuController.enable(true, 'profile')
    this.registered_courses = await this.prvdr.get_registered_courses()
    if(!this.registered_courses){
      this.isRegisteredCourses = false
    }else{
      this.registered_courses = this.registered_courses.registered_courses.split(',')
      this.isRegisteredCourses = true
    }
    //get on going classes in the department and level
    this.onGoingClasses = await this.prvdr.get_classes()
    //filter out on going classes for registered
    if(!this.registered_courses) {
      //
    }else{
      try {
        this.registered_courses.forEach(async courses=>{
          if(this.onGoingClasses === undefined){
            console.log("no classes")
            let courseData = await this.storage.get('student_course_data');
            let classes = courseData.filter(res=>{
              res.class_time = moment(res.class_time).format("hh:mm a")
              return res.course_code === courses
            })
            this.rows.push(...classes)
            this.rows = [...this.rows]
          }else{
            let onGoingClasses = this.onGoingClasses.filter(res=>{
              return res.course_code === courses
            })
            this.ogc.push(...onGoingClasses)
            if(this.ogc.length !== 0){
              console.log(this.ogc)
              this.isOngoingClass = true;
            }
            let courseData = await this.storage.get('student_course_data');
            let classes = courseData.filter(res=>{
              res.class_time = moment(res.class_time).format("hh:mm a")
              return res.course_code === courses
            })
            this.rows.push(...classes)
            this.rows = [...this.rows]
            await this.storage.set('ongoingclass',this.ogc)
            this.check_if_in_class()
          }
        });
      } catch (error) {
        console.log(error)
      }
      //get rows data for the class schedule table
      }
    }
  async goto(courseCode) {
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
  ionViewWillLeave(){
    this.rows.length = 0;
    this.ogc.length = 0;
  }

}
