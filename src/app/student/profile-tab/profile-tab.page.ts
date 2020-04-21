import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { IonTabs, MenuController } from '@ionic/angular';
import { ProviderService } from 'src/app/shared/provider.service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {
  activeTabName: string;
  title = 'class manager'
  data
  name;

  getTab(ev){
    if(ev.tab === 'profile'){
      this.title = 'User Profile'
      this.activeTabName = 'profile'
    }else if(ev.tab === 'attendance'){
      this.title = 'Attendance'
      this.activeTabName = 'attendance'
   }
  }

  constructor(
    private storage: Storage,
    private route:Router,  
    private menu: MenuController, 
    private prvdr:ProviderService
  ) {}
  async ngOnInit() {
   
  }
  async ionViewWillEnter(){
    let a = await this.prvdr.get_stud_data()
    this.name = a.name
  }
}
