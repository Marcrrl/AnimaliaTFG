import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesAnimalPageRoutingModule } from './detalles-animal-routing.module';

import { DetallesAnimalPage } from './detalles-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesAnimalPageRoutingModule
  ],
  declarations: [DetallesAnimalPage]
})
export class DetallesAnimalPageModule {}


