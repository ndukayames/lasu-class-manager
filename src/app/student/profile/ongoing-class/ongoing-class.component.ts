import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { ProviderService } from 'src/app/shared/provider.service';
import { at } from 'lodash';

@Component({
  selector: 'app-ongoing-class',
  templateUrl: './ongoing-class.component.html',
  styleUrls: ['./ongoing-class.component.scss'],
})
export class OngoingClassComponent implements OnInit {
@Input() ogc
ogcDepartment:any[]
classStatus:string
attendance: boolean =false
@Input()hoc
  constructor(private storage:Storage,private modalController: ModalController, private prvdr:ProviderService) { }
  closeModal(){
    this.modalController.dismiss({
      'dismissed': true,
      'attendance': this.attendance
    });
  }

  async markAttendance(course_code,department,date_started,h,event,joined){
    console.log(course_code,department,date_started,h,event,joined)
    if(event === '0' && joined === false){
      let token = await this.storage.get('login_access_token')
      let datass = await this.storage.get('stud_loggedin_data')
      let body = {
        function: 'mark_attendance',
        course_code,
        department,
        date_started,h,
        matric_number: datass.matric_number     
       }
       let request:any = await this.prvdr.dbops.postData(token,body,'api.php').toPromise()
       if(!request){
        console.log('Error')
       }else{
        if(request.success === true){
          console.log(request)
          this.prvdr.doToast('Attendance submitted','middle',2000)
          this.attendance = true
        }else if(request.success === false){
          console.log(request)
         this.prvdr.doToast(request.msg,'middle',2000)
        }
      }
    }else{
      console.log('trouble')
    }
  }

  async ngOnInit() {
    let datass = await this.storage.get('stud_loggedin_data')
    this.ogcDepartment = await this.prvdr.get_other_classes(this.ogc[0].course_code)
    this.ogcDepartment = this.ogcDepartment.filter(res=>{
      return res.department !== datass.department
    })
    console.log(this.ogc)
  }

  async ionViewWillEnter(){
    let datass = await this.storage.get('stud_loggedin_data')
    console.log(this.ogc)
    if(this.ogc[0].event === "0"){
      this.classStatus = "Started"
    }else if(this.ogc[0].event === "1"){
      this.classStatus = "Ended"
    }else{
      this.classStatus = "Canceled"
    }
  }
  async endClass(hoc,courseCode,date_started){
    this.prvdr.endClass(hoc,courseCode,date_started)     
   //  this.getOngoingClass()
  }
}