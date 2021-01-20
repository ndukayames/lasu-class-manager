import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, ModalController, IonRouterOutlet, IonItemSliding } from '@ionic/angular';
import { ProviderService } from 'src/app/shared/provider.service';
import { ViewPage } from '../student-course-reg/view/view.page';
import * as moment from 'moment'
import * as _ from 'lodash'
import { Socket } from 'ngx-socket-io';
import { OngoingClassComponent } from './ongoing-class/ongoing-class.component';
import { ClassHistoryComponent } from './class-history/class-history.component';


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
  registered_courses ;
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
          console.log(res)
          if(res.me === true){
            this.prvdr.doToast("Successfully Joined Class","bottom",2000)
          }else{
            this.prvdr.doToast(res.clients[res.id].full_name +" Joined Class ","bottom",2000)
          }
        })
        this.socket.fromEvent('left_class').subscribe((res:any)=>{
          this.prvdr.doToast("You left the class at " + res.timeleft, "middle",2000)
        })
        this.socket.fromEvent('new_class').subscribe(async (res:any)=>{
          console.log(res)
          let stud_data = await this.storage.get('stud_loggedin_data')
          this.registered_courses.forEach(course=>{
            if(course === res.classDetails.course_code && stud_data.department === res.classDetails.department && stud_data.level === res.classDetails.level){
              console.log('one of my class just got started')
              console.log(res.classDetails.course_code,course,res.classDetails.department,stud_data.department,res.classDetails.level,stud_data.level)
              this.getOngoingClass()
            }else{
              console.log(res.classDetails.course_code,course,res.classDetails.department,stud_data.department,res.classDetails.level,stud_data.level)
              console.log('a class got started but not mine')
            }
          })
        })
        this.socket.fromEvent('class_ended').subscribe((res:any)=>{
          console.log('class eneded socket')
          this.ogc.forEach(courses=>{
            if(courses.course_code === res.courseCode && res.hoc === courses.hoc){
              console.log('class ended')
              this.prvdr.doToast(res.courseCode + " ended","bottom",2000)
              this.getOngoingClass()
              // this.check_if_in_class()
              // this.getOngoingClass()
            }
          })
        })
        this.socket.fromEvent('class_canceled').subscribe((res:any)=>{
          console.log(res)
          this.ogc.forEach(courses=>{
            if(courses.course_code === res.courseCode && res.hoc === courses.hoc){
              console.log('class canceled')
              this.prvdr.doToast(res.courseCode + " canceled","bottom",2000)
              this.getOngoingClass()
              // this.check_if_in_class()
              // this.getOngoingClass()
            }
          })
        })
        this.socket.fromEvent('lecturer_class_canceled').subscribe((res:any)=>{
          this.ogc.forEach(courses=>{
            if(courses.course_lecturer === res.lecturer && res.courseCode === courses.course_code){
              this.prvdr.doToast(res.courseCode + " canceled by lecturer","bottom",2000)
              this.getOngoingClass()
              // this.check_if_in_class()
              // this.getOngoingClass()
            }
          })
        })
        this.socket.fromEvent('lecturer_class_ended').subscribe((res:any)=>{
          this.ogc.forEach(courses=>{
            if(courses.course_lecturer === res.lecturer && res.courseCode === courses.course_code){
              this.prvdr.doToast(res.courseCode + " ended by lecturer","bottom",2000)
              this.getOngoingClass()
              // this.check_if_in_class()
              // this.getOngoingClass()
            }
          })
        })
        this.socket.fromEvent('people_in_class').subscribe((res:any)=>{
          console.log('checking started')
          console.log(res)
          console.log('checking done')
        })
  }

  async presentModal(courseCode) {
    console.log(await this.storage.get('ongoingclass'))
    let ongc = await this.storage.get('ongoingclass')
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
    modal.onDidDismiss().then((res:any)=>{
        this.check_if_in_class()
    })
    return await modal.present();
  }
   async endClass(hoc,courseCode,date_started){
     let ender = await this.prvdr.endClass(hoc,courseCode,date_started)  
     if(ender === true){
      console.log(ender)
      this.socket.emit('end_class',hoc,(courseCode))
      this.myslid.closeOpened()
     }   
    //  this.getOngoingClass()
   }

  async logout(){
    this.prvdr.stud_logout()
  }

  async cancelClass(department,course_code,date_started,hoc){
    let canceler = await this.prvdr.cancelClass(department,course_code,date_started,hoc)
    if(canceler === true){
      console.log(canceler)
      this.socket.emit('cancel_class',hoc,(course_code))
      this.myslid.closeOpened()
    }
    // this.getOngoingClass()
  }

  async check_if_in_class(){
    console.log('checking if in class')
    let token = await this.storage.get('login_access_token')
    let datas:any = await this.storage.get('stud_loggedin_data')
    this.ogc.forEach(async (elements) => {
      let body = {
        function: 'get_matric_number',
        course_code: elements.course_code,
        class_id: elements.class_id,
        matric_number: datas.matric_number,
        department: datas.department
      };
      let request: any = await this.prvdr.dbops.postData(token, body, 'api.php').toPromise();
      if (!request) {
        console.log('couldn\'t reach server');
      } else {
        let student_list = request.result.split(',');
        if (student_list.includes(body.matric_number)) {
          elements.joined = true;
          await this.storage.set('ongoingclass', this.ogc);
        } else {
          elements.joined = false;
          await this.storage.set('ongoingclass', this.ogc);
        }
      }
    })
  }
  
  async getOngoingClass(){
    console.log('working!!!!')
    this.ogc = []
    this.onGoingClasses = await this.prvdr.get_classes()
    
    if(!this.onGoingClasses){
      this.isOngoingClass = false
    }else{
      this.registered_courses.forEach(course=>{
        let onGoingClasses = this.onGoingClasses.filter(res=>{
          return res.course_code === course
        })
        this.ogc.push(...onGoingClasses)
        if(this.ogc.length !== 0){
          // console.log(this.ogc)
          this.isOngoingClass = true;
        }else{
          this.isOngoingClass = false;
        }
      })
    }
    
    this.check_if_in_class()
  }
  async courseInfo(ev){
    // console.log(ev)
  }
  async getCourseHistory(courseCode){
    const modal = await this.modalController.create({
      component: ClassHistoryComponent,
      componentProps: {
        courseCode,
        'hoc':this.hoc
      }
    });
    return await modal.present();
  }
  async ionViewWillEnter(){
    const loading = await this.prvdr.loadingCtrl.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present();
    let completeprofilechecker = await this.prvdr.checkCompleteProfile(status)
    let datas:any = await this.storage.get('stud_loggedin_data')
    this.name = datas.full_name;
    this.matric_number = datas.matric_number
    if(datas.complete_profile==='1' || completeprofilechecker === true){
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
            // console.log("no classes")
            //if no class, nothing much left to do, just setup the table
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
              // console.log(this.ogc)
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
          }
        });
      } catch (error) {
        // console.log(error)
      }
      //get rows data for the class schedule table
      }
      await this.check_if_in_class()
      loading.dismiss()
      
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
