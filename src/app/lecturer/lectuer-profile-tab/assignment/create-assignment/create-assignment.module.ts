import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAssignmentPageRoutingModule } from './create-assignment-routing.module';

import { CreateAssignmentPage } from './create-assignment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAssignmentPageRoutingModule
  ],
  declarations: [CreateAssignmentPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateAssignmentPageModule {}
