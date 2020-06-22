import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/shared/provider.service';
import { PopoverController } from '@ionic/angular';
import { LecPopComponent } from '../lec-pop/lec-pop.component';

@Component({
  selector: 'app-lectuer-profile-tab',
  templateUrl: './lectuer-profile-tab.page.html',
  styleUrls: ['./lectuer-profile-tab.page.scss'],
})
export class LectuerProfileTabPage implements OnInit {
 
  constructor(private storage: Storage, private route:Router, private prvdr:ProviderService, private popoverController: PopoverController) { }
  async presentPopup(ev){
    const popover = await this.popoverController.create({
      component: LecPopComponent,
      event: ev,
      // animated: false,
      translucent: false
    });
    return await popover.present();
  }
  async ngOnInit() {}
  user_name
  async ionViewWillEnter(){
    try {
      let b = await this.storage.get('lecturer_academic_data')
    let a = await this.storage.get('loggedin_lecturer_data')
    this.user_name = a.user_name
    console.log(b)
    } catch (error) {
      
    }
  }

}
