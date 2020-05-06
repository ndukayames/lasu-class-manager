import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { ProviderService } from 'src/app/shared/provider.service';
import { ViewPage } from '../student-course-reg/view/view.page';

import * as _ from 'lodash'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  data;
  name = '';
  inCompleteProfile = true;
  hoc = true;
  onGoingClasshoc = []
  registered_courses;
  onGoingClasses = []
  matric_number: any;
  ogc: any[] = [];
  constructor(
    private storage: Storage,
    private menuController: MenuController, 
    private prvdr:ProviderService,
    private  modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    ){}

  async ngOnInit(){}

  joinClass(Hoc,courseCode){
    console.log(Hoc,courseCode)
   }
   async endClass(courseCode){
    let datass = await this.storage.get('stud_loggedin_data')
     let body = {
       function: 'end_class',
       course_code: courseCode,
       department: datass.department,
       level: datass.level
     }
     let response:any = await this.prvdr.dbops.postData(body,'api.php').toPromise()
     if(response === null){
       console.log('invalid response from server')
     }else{
       if(response.success === true){
         console.log(response.msg)
       }else{
        console.log(response.msg)
       }
     }
   }

  async logout(){
    this.prvdr.stud_logout()
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
      console.log('no courses found')
    }else{
      this.registered_courses = this.registered_courses.registered_courses.split(',')
    console.log(this.registered_courses)
    }
    //this function gets on going courses from the server
    let datass = await this.storage.get('stud_loggedin_data')
    let body = {
      function: 'get_class',
     department: datass.department,
     level: datass.level
    }
    let response:any = await this.prvdr.dbops.postData(body,'api.php').toPromise()
      if(response === null){
        console.log('could not reach server')
      }else{
        if(response.success){
          if(response.result === null){
            console.log('reached server buh I didn\'t get any results')
          }
          else{
            this.onGoingClasses.push(...response.result)
            this.onGoingClasses = _.uniqBy(this.onGoingClasses,'course_code');
          }
          if(!this.registered_courses){
            console.log('can\'t execute the function to get ongoing classes becaause the student hasn\'t registered any course')
          }else{
            this.registered_courses.forEach(courses => {
              let onGoingClasses = this.onGoingClasses.filter(res=>{
                return res.course_code === courses
              })
              this.ogc.push(...onGoingClasses)
              this.ogc = _.uniqBy(this.ogc, 'course_code')
              console.log(this.ogc,this.registered_courses)
            });
          }
        }else{
          console.log('error fetching class')
        }
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
    this.onGoingClasses = []
    console.log('left')
  }
}
