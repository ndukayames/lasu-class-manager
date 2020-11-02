import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProviderService } from 'src/app/shared/provider.service';
import * as _ from 'lodash'
import * as moment from 'moment';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-class-history',
  templateUrl: './lect-class-history.component.html',
  styleUrls: ['./class-history.component.scss'],
})
export class LecClassHistoryComponent implements OnInit {
@Input() courseCode;lecturer;department
class_history:any[] = []
theView


  constructor(private modalController: ModalController, private prvr:ProviderService) { }

 async ngOnInit() {
   console.log(this.department)
  let token = await this.prvr.storage.get('login_access_token')
    let body = {
      function: 'get_lect_class_history',
      course_code: this.courseCode,
      department: this.department
    }
    let request:any = await this.prvr.dbops.postData(token,body,'api.php').toPromise()
    if(!request){
      this.prvr.doToast('No class history','middle',5000)
    }else{
      if(request.success === true){
        if(!request.result){
          this.prvr.doToast('No class history','middle',5000)
        }else{
          request.result.forEach(async element=>{
            if(element.event === '0'){
              element.events = "On going"
            }else if(element.event === '1'){
              element.events = 'Ended'
            }else if(element.event === '2'){
              element.events = 'Canceled'
            }
            let date = moment(element.date).format("YYYY-MM-DD")
            element.class_day = date
            let body = {
              function: 'get_lect_class_history_for_other_dept',
              course_code: element.course_code,
              date,
            }
            let request:any = await this.prvr.dbops.postData(token,body,'api.php').toPromise()
            let department:any[] = []
            department.push(...request.result)
            element.departments = department
          })
          this.class_history = [...request.result]
          console.log(this.class_history)
          let a  = this.class_history.sort((a, b) => b.date + a.date)
          const {course_title} = this.class_history[0]
          await this.prvr.storage.set('course_title',course_title)
        }
        }
        else{
          this.prvr.doToast('No class history','middle',5000)
        }
    }
  }
  async openorhide(classDay,identifier:string){
    classDay.theView = !classDay.theView
    this.theView = !this.theView
    if(classDay.theView){
      this.class_history = this.class_history.filter(res=>{
        return res.identifier === identifier
      })
    }
    else{
      this.ngOnInit()
    }
  }
  openDepartmentAttendance(class_day,course_code,department){
    console.log(class_day,course_code,department)
    let navigationExtras: NavigationExtras = {
      state: {
        course_code,
        department,
        class_day,
        function: 'openDepartmentAttendance'
      }
    };
    console.log(department)
    this.prvr.route.navigateByUrl('/classes/'+department,navigationExtras)
    this.closeModal()
  }
  closeModal(){
    this.modalController.dismiss()
  }
  async createAssignment(){
    let course_title = await this.prvr.storage.get('course_title')
    this.prvr.route.navigateByUrl('/lecturer-profile-tab/assignment/create-assignment')
    this.closeModal()
  }
}
