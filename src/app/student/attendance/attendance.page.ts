import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  constructor( private menuController: MenuController) { }

  ngOnInit() {
  }
ionViewWillEnter(){
  this.menuController.enable(true, 'attendance')
}
}
