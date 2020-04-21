import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { ProviderService } from './shared/provider.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCtrl: NavController,
    private prvdr: ProviderService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  //   this.storage.get('loggedin_student').then((res)=>{
  //     if(res==null){
  //       this.navCtrl.navigateRoot('/home');
  //     }
  //     else{
  //       this.navCtrl.navigateRoot('/student-profile-tab');
  //     }
  //   })
  }
}
