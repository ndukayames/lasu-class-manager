import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateNewPageRoutingModule } from './create-new-routing.module';

import { CreateNewPage } from './create-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateNewPageRoutingModule
  ],
  declarations: [CreateNewPage]
})
export class CreateNewPageModule {}
