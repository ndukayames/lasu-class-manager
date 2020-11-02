import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbopsService } from 'src/app/shared/dbops.service';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-departments-in-this-class',
  templateUrl: './departments-in-this-class.page.html',
  styleUrls: ['./departments-in-this-class.page.scss'],
})
export class DepartmentsInThisClassPage implements OnInit {
department;
course_code;
student_list = []
items:any[]
function
course_date
dept //variable from lect-class-history
class_day
backButton = false;
  constructor(private route:Router, private location:Location, private activatedRoute:ActivatedRoute, private dbops:DbopsService, private storage:Storage,  private modalController: ModalController) {
    console.log(this.route.getCurrentNavigation().extras.state.course_code)
    this.course_code = this.route.getCurrentNavigation().extras.state.course_code
    this.function = this.route.getCurrentNavigation().extras.state.function
    this.course_date = this.route.getCurrentNavigation().extras.state.date
    this.dept = this.route.getCurrentNavigation().extras.state.department
    this.class_day = this.route.getCurrentNavigation().extras.state.class_day
   }
   async closemodal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  
   }
   async doSomething(){
    let token = await this.storage.get('login_access_token')
    this.department = this.activatedRoute.snapshot.paramMap.get("department_in_this_class")
    if (!this.function) {
      let body = {
        function: 'get_matric_number',
        department : this.department,
        course_code: this.course_code
      }
      let request:any = await this.dbops.postData(token,body,'api.php').toPromise()
      if(!request){
        console.log('could not reach server')
      }else{
        if(request.success === true){
          let matric_numbers:any[] = request.result.split(',')
          matric_numbers.forEach(async element=>{
            let body = {
              function: 'get_student_name',
              matric_number: element
            }
            let request2:any = await this.dbops.postData(token,body,'api.php').toPromise()
            if(!request2){
              console.log('cant reach server')
            }else{
              if(request.success === true){
                let student_data = {
                  name: request2.result,
                  matric_number: element
                }
                this.student_list.push(student_data)
                return this.student_list;
              }else{
                console.log('error')
              }
            }
          })
        }else{
          console.log(request.msg)
        }
      }
    } else if(this.function === 'ended_class') {
      this.backButton = true;
      let body = {
        function: 'get_attendance_from_ended_class',
        department: this.department,
        course_code: this.course_code,
        date: this.course_date
      }
      console.log(body)
      let request:any = await this.dbops.postData(token,body,'api.php').toPromise()
      if(!request){
        console.log('could not reach server')
      }else{
        if(request.success === true){
          console.log(request.result)
          let matric_numbers:any[] = request.result.split(',')
          matric_numbers.forEach(async element=>{
            let body = {
              function: 'get_student_name',
              matric_number: element
            }
            let request2:any = await this.dbops.postData(token,body,'api.php').toPromise()
            if(!request2){
              console.log('cant reach server')
            }else{
              if(request.success === true){
                let student_data = {
                  name: request2.result,
                  matric_number: element
                }
                this.student_list.push(student_data)
                return this.student_list;
              }else{
                console.log('error')
              }
            }
          })
        }else{
          console.log(request.msg)
        }
      }
    }else if(this.function === 'openDepartmentAttendance'){
      this.backButton = true;
      let body = {
        function: 'get_matric_number2',
        date: this.class_day,
        course_code:this.course_code,
        department:this.department
      }
      let request:any = await this.dbops.postData(token,body,'api.php').toPromise()
      console.log(request.result)
      let matric_numbers:any[] = request.result.split(',')
      matric_numbers.forEach(async element=>{
        let body = {
          function: 'get_student_name',
          matric_number: element
        }
        let request2:any = await this.dbops.postData(token,body,'api.php').toPromise()
        if(!request2){
          console.log('cant reach server')
        }else{
          if(request.success === true){
            let student_data = {
              name: request2.result,
              matric_number: element
            }
            this.student_list.push(student_data)
            return this.student_list;
          }else{
            console.log('error')
          }
        }
      })
    }
    return this.student_list;
   }

  async ngOnInit() {
    console.log(this.function)
    await this.doSomething();
    this.items = await this.doSomething()
  }
}
