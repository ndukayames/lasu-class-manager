import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { PopoverComponent } from './home/popover/popover.component';
import { LecPopComponent } from "./lecturer/lec-pop/lec-pop.component";
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from "@auth0/angular-jwt";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MoreDetailsComponent } from './lecturer/lectuer-profile-tab/classes/more-details/more-details.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { OngoingClassComponent } from './student/profile/ongoing-class/ongoing-class.component';
import { ClassMoreDetailsComponent } from './lecturer/lectuer-profile-tab/classes/class-more-details/class-more-details.component';
import { ClassHistoryComponent } from './student/profile/class-history/class-history.component';
import { LecClassHistoryComponent } from './lecturer/lectuer-profile-tab/classes/class-history/lect-class-history.component';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';



const config: SocketIoConfig = { url: 'http://localhost:3001/', options: {} };

@NgModule({
  declarations: [AppComponent,PopoverComponent,LecPopComponent,MoreDetailsComponent, OngoingClassComponent,ClassMoreDetailsComponent,ClassHistoryComponent,LecClassHistoryComponent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  entryComponents: [PopoverComponent,LecPopComponent,MoreDetailsComponent,OngoingClassComponent,ClassMoreDetailsComponent,ClassHistoryComponent,LecClassHistoryComponent],
  imports: [
    SocketIoModule.forRoot(config),
    NgxDatatableModule,
    BrowserModule, 
    IonicStorageModule.forRoot(), 
    HttpClientModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    JwtModule.forRoot({
      config: {}
    }),
  ],
  providers: [
    StatusBar, 
    SplashScreen,
    Device,
    File,
    Camera,
    DatePicker,
    JwtHelperService,
    WebView,
    FilePath,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
