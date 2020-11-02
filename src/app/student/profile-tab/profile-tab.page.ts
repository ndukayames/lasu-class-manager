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
  name;


  constructor(private storage: Storage, private prvdr:ProviderService) {}
  async ngOnInit() {
    let a = await this.prvdr.get_stud_data()
    this.name = a.full_name
    console.log(this.name)
  }
  
  async ionViewWillEnter(){
    
  }
}
