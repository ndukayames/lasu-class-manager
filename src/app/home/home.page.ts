import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private popoverController: PopoverController) { }



  async presentPopup(ev){
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      // animated: false,
      translucent: false
    });
    return await popover.present();
  }
  ngOnInit() {}
}
