import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/provider.service';
import { LoadingController, PopoverController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { PopoverComponent } from './popover/popover.component';
import { Device } from '@ionic-native/device/ngx';
import { BrowserModule } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  test(){
    alert()
  }
  
  async loading(){
    const loading = await this.loadingCtrl.create({
      message: 'please wait',
    });
    await loading.present()
    await loading.dismiss()
  }

  constructor(private provider:ProviderService, private loadingCtrl:LoadingController, private route:Router, private popoverController: PopoverController, private device: Device, private platform: Platform, private storage: Storage) { }



  async presentPopup(ev){
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      // animated: false,
      translucent: false
    });
    return await popover.present();
  }
  ionViewWillEnter(){
    this.storage.get('loggedin_student').then((res)=>{
      if(res==null){
        // alert("logged out user")
      }
      else{
        // this.navCtrl.navigateRoot('/student-profile-tab');
      }
    })
  }

  ngOnInit() {

   
  }
  gotoStudLogin(){
    this.route.navigateByUrl('/student-login')
  }
  gotoLectLogin(){
    this.route.navigateByUrl('/lecturer-login')
  }
}
