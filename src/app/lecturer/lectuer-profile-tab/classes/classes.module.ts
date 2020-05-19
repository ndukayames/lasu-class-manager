import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassesPageRoutingModule } from './classes-routing.module';

import { ClassesPage } from './classes.page';
import { PopoverComponent } from 'src/app/home/popover/popover.component';
import { ScrollVanishDirective } from '../../directives/scroll-vanish.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassesPageRoutingModule
  ],
  declarations: [ClassesPage, ScrollVanishDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClassesPageModule {}
