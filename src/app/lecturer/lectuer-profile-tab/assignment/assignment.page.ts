import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/shared/provider.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.page.html',
  styleUrls: ['./assignment.page.scss'],
})
export class AssignmentPage implements OnInit {

  constructor(private prvr:ProviderService,private modalController: ModalController) { }

  ngOnInit() {
  }
  closeModal(){
    this.modalController.dismiss()
  }
  async createAssignment(){
    let course_title = await this.prvr.storage.get('course_title')
    this.prvr.route.navigateByUrl('/lecturer-profile-tab/assignment/create-assignment')
  }
}
