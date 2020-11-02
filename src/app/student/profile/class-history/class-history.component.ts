import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProviderService } from 'src/app/shared/provider.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-class-history',
  templateUrl: './class-history.component.html',
  styleUrls: ['./class-history.component.scss'],
})
export class ClassHistoryComponent implements OnInit {
@Input() courseCode
@Input() hoc
items:any[]
theView:boolean
  constructor(private modalController: ModalController,private prvdr:ProviderService) { }

  async openDepartmentAttendance(date,course_code){
    let datas:any = await this.prvdr.storage.get('stud_loggedin_data')
    let department = datas.department
    console.log(datas)
    let navigationExtras: NavigationExtras = {
      state: {
        course_code,
        function: 'ended_class',
        date: date
      }
    };
    console.log(department)
    this.prvdr.route.navigateByUrl('/classes/'+department,navigationExtras)
    this.closeModal()
  }
  async openDepartmentAttendanceOngoing(course_code){
    let datas:any = await this.prvdr.storage.get('stud_loggedin_data')
    let department = datas.department
    console.log(datas)
    let navigationExtras: NavigationExtras = {
      state: {
        course_code,
        // function: 'ongoing_class'
      }
    };
    console.log(department)
    this.prvdr.route.navigateByUrl('/classes/'+department,navigationExtras)
    this.closeModal()
  }
  
  async ngOnInit() {
    let datass = await this.prvdr.storage.get('stud_loggedin_data')
    try {
      this.items = await this.prvdr.getClassHistory(this.courseCode,datass.department)
    this.items.forEach(async element => {
    let request:any = await this.prvdr.check_course_attendance(element.course_code)
      if(element.event === '0'){
        element.events = "On going"
      }else if(element.event === '1'){
        element.events = 'Ended'
      }else if(element.event === '2'){
        element.events = 'Canceled'
      }
      if(request === true){
        element.attendance = 'Attended'
      }else{
        element.attendance = 'No Attendance'
      }
    });
    } catch (error) {
    }
  }

  async openorhide(classDay,identifier:string){
    classDay.theView = !classDay.theView
    this.theView = !this.theView
    if(!classDay.theView){
      this.prvdr.loadingCtrl.create({
        message: "please wait ..."
      })
      let datass = await this.prvdr.storage.get('stud_loggedin_data')
      this.items = await this.prvdr.getClassHistory(this.courseCode,datass.department)
      this.items.forEach(async element => {
        let request:any = await this.prvdr.check_course_attendance(element.course_code)
        if(element.event === '0'){
          element.events = "On going"
        }else if(element.event === '1'){
          element.events = 'Ended'
        }else if(element.event === '2'){
          element.events = 'Canceled'
        }
        if(request === true){
          element.attendance = 'Attended'
        }else{
          element.attendance = 'No Attendance'
        }
      });
      this.prvdr.loadingCtrl.dismiss()
    }else{
      this.items = this.items.filter(res=>{
        return res.identifier === identifier
      })
      this.items.forEach(async element => {
        let request:any = await this.prvdr.check_course_attendance(element.course_code)
        if(element.event === '0'){
          element.events = "On going"
        }else if(element.event === '1'){
          element.events = 'Ended'
        }else if(element.event === '2'){
          element.events = 'Canceled'
        }
        if(request === true){
          element.attendance = 'Attended'
        }else{
          element.attendance = 'No Attendance'
        }
      });
      console.log(this.items)
    }
  }

  closeModal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
