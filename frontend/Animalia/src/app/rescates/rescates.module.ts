import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RescatesPageRoutingModule } from './rescates-routing.module';

import { RescatesPage } from './rescates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RescatesPageRoutingModule
  ],
  declarations: [RescatesPage]
})
export class RescatesPageModule {}
