import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, MenuController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/shared/provider.service';
import { ViewPage } from '../student-course-reg/view/view.page';

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
  registered_courses;

  constructor(
    private storage: Storage,
    private route:Router, 
    private menuController: MenuController, 
    private prvdr:ProviderService,
    private  modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    ){}
  ngOnInit(){}

  async logout(){
    this.prvdr.stud_logout()
  }
  async ionViewWillEnter(){
    let datas:any = await this.prvdr.get_stud_data()
    this.name = datas.full_name;
    if(datas.complete_profile==='1'){
      this.inCompleteProfile = false;
    }
    if(datas.type !== 'hoc'){
      this.hoc = false;
    }
    this.menuController.enable(true, 'profile')
    this.storage.keys().then(res=>{
      console.log(res)
    })
    this.registered_courses = await this.storage.get('registered_courses');
    this.registered_courses = this.registered_courses.registered_courses.split(',')
    console.log(this.registered_courses)
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
}
