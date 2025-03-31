import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CamaraPage } from './Camara.page';

import { CamaraPageRoutingModule } from './Camara-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CamaraPageRoutingModule
  ],
  declarations: [CamaraPage]
})
export class CamaraPageModule {}
