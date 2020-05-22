import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProviderService } from 'src/app/shared/provider.service';

@Component({
  selector: 'app-class-more-details',
  templateUrl: './class-more-details.component.html',
  styleUrls: ['./class-more-details.component.scss'],
})
export class ClassMoreDetailsComponent implements OnInit {
@Input() courseCode;courseTitle
allcourses
  constructor(private modalController: ModalController, private prvdr:ProviderService) { }

  async ngOnInit() {
    this.allcourses = await this.prvdr.get_lect_other_classes(this.courseCode)
  }
  closeModal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
