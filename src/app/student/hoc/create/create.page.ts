import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/shared/provider.service';
import { Storage } from '@ionic/storage';
import { DbopsService } from 'src/app/shared/dbops.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  course_title;
  course_code;
  class_date;
  class_lecturer;
  class_lecturers = [];
  class_lecturers_string
  class_hoc;
  deparment;
  selecting_lecturer = false;
  matric_number;
  constructor(private prvdr:ProviderService,private dbops:DbopsService, private storage:Storage, private datePicker:DatePicker, private route:Router, private loadingCtrl:LoadingController, private toastCtrl:ToastController) { }

  class_day;
  class_days=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  onChange(ev){
    if(ev.code==='Enter' || ev.key==='Enter'){
      if(!this.class_lecturer){
        this.prvdr.doToast("please enter a course", "bottom", 2000)
        this.selecting_lecturer = false
      }else{
        this.selecting_lecturer = true;
        this.class_lecturers.push(this.class_lecturer)
        this.class_lecturer = '';
      }
      
    }
  }
  removeLecturer(lecturer){
    this.class_lecturers = this.class_lecturers.filter(lec=>{
      return lec !== lecturer;
    })
    if(this.class_lecturers.length < 1){
      this.selecting_lecturer = false;
    }
  }
  async ConvertDate(date){
     date = await new Date(date).toLocaleTimeString();
     return date;
  }
  async presentToastWithOptions(m) {
    const toast = await this.toastCtrl.create({
      header: 'Toast header',
      message: m,
      position: 'top',
      color: 'medium',
      duration: 2000
    });
    toast.present();
  }
async createClass(){
  this.class_date = await this.ConvertDate(this.class_date);
  const loading = await this.loadingCtrl.create({
    message: 'Creating Class...',
    duration: 2000
  })
  await loading.present();
  this.class_lecturers_string = this.class_lecturers.toString()
  if(!this.course_title||!this.course_code||!this.class_date||!this.class_lecturers_string||!this.class_day){
    loading.dismiss();
    this.presentToastWithOptions("some fields are empty")
  }else{
    console.log(this.class_date)
  let body={
    function          : 'new_class',
    course_code       : this.course_code,
    course_title      : this.course_title,
    course_time       : this.class_date,
    course_lecturer   : this.class_lecturers_string,
    class_hoc         : this.class_hoc,
    department        : this.deparment,
    class_day         : this.class_day,
    matric_number     : this.matric_number
  }
  console.log(body)
  let update: any = await this.dbops.postData(body,'api.php').toPromise()
  if(update.success===true){
    await this.prvdr.fetch_course_data();
    this.route.navigateByUrl('student-profile-tab/hoc')
    this.presentToastWithOptions('course registered successfully')
    console.log('class added success')
    loading.dismiss();
    this.course_title = '';
    this.course_code = '';
    this.class_date  = '';
    this.class_lecturer = '';
    this.class_lecturers = [];
    this.class_lecturers_string = ''
    this.class_hoc;
    this.deparment;
    this.selecting_lecturer = false;
    this.matric_number;
  }else{
    this.presentToastWithOptions(update.msg)
    loading.dismiss();
  }
  }
}

  ngOnInit() {}
  async ionViewWillEnter(){
    let a = await this.prvdr.get_student_login_data()
    console.log(a)
    this.class_hoc      = a.full_name
    this.deparment      = a.department
    this.matric_number  = a.matric_number
    
  }

}
