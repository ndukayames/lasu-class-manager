import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { ProviderService } from 'src/app/shared/provider.service';

@Component({
  selector: 'app-ongoing-class',
  templateUrl: './ongoing-class.component.html',
  styleUrls: ['./ongoing-class.component.scss'],
})
export class OngoingClassComponent implements OnInit {
@Input() ogc
ogcDepartment:any[]
classStatus:string
@Input()hoc
  constructor(private storage:Storage,private modalController: ModalController, private prvdr:ProviderService) { }
  closeModal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async markAttendance(course_code,department,date_started,h,event,joined){
    console.log(this.markAttendance)
    if(event === '0' && joined === true){
      let token = await this.storage.get('login_access_token')
      let datass = await this.storage.get('stud_loggedin_data')
      let body = {
        function: 'mark_attendance',
        course_code,department,date_started,h,
        matric_number: datass.matric_number     
       }
       console.log('body')
       let request:any = await this.prvdr.dbops.postData(token,body,'api.php').toPromise()
       if(!request){
        console.log('Error')
       }else {
        if(request.success === true){
          console.log(request)
          this.prvdr.doToast('Attendance submitted','middle',2000)
        }else if(request.success === false){
          console.log(request)
         this.prvdr.doToast(request.msg,'middle',2000)
        }
       }
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
  async joinClass(){
    let datass = await this.storage.get('stud_loggedin_data');
    let onGoingClasses = await this.storage.get('ongoingclass')
    onGoingClasses =  onGoingClasses.find(res=>{
      return res.course_code === this.ogc
    })
    let class_mark = {
      matric_number: datass.matric_number,
      full_name : datass.full_name,
      department: datass.department,
      courseCode: this.ogc[0].course_code,
      Hoc: this.ogc[0].hoc
    }
    console.log(class_mark)
    this.prvdr.socket.emit('join_class',class_mark)
    this.ogc[0].joined = true;
    this.prvdr.socket.emit('check_if_in_class',class_mark.matric_number,(class_mark.courseCode))
    console.log(this.ogc)
    this.ionViewWillEnter()
  }
}