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

  async ngOnInit() {
    let datass = await this.storage.get('stud_loggedin_data')
    this.ogcDepartment = await this.prvdr.get_other_classes(this.ogc[0].course_code)
    this.ogcDepartment = this.ogcDepartment.filter(res=>{
      return res.department !== datass.department
    })
    console.log(this.ogcDepartment)
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