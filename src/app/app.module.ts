import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { PopoverComponent } from './home/popover/popover.component';
import { LecPopComponent } from "./lecturer/lec-pop/lec-pop.component";
import { DatePicker } from '@ionic-native/date-picker/ngx';



@NgModule({
  declarations: [AppComponent,PopoverComponent,LecPopComponent],
  entryComponents: [PopoverComponent,LecPopComponent],
  imports: [BrowserModule, IonicStorageModule.forRoot(), HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    DatePicker,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
