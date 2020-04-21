import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-lec-pop',
  templateUrl: './lec-pop.component.html',
  styleUrls: ['./lec-pop.component.scss'],
})
export class LecPopComponent implements OnInit {

  constructor(private route : Router, private popoverController: PopoverController,private storage:Storage) { }
  goto(){
    this.route.navigateByUrl('/lectuer-profile-tab/my-profile')
    this.popoverController.dismiss()
  }
  Logout(){
    this.storage.clear()
    this.route.navigateByUrl('home/login')
  }
  ngOnInit() {}

}
