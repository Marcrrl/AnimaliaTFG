import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesEmpresaPageRoutingModule } from './detalles-empresa-routing.module';

import { DetallesEmpresaPage } from './detalles-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesEmpresaPageRoutingModule
  ],
  declarations: [DetallesEmpresaPage]
})
export class DetallesEmpresaPageModule {}
