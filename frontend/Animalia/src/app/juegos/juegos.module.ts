import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { JuegosPageRoutingModule } from './juegos-routing.module';
import { JuegosPage } from './juegos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    JuegosPageRoutingModule
  ],
  declarations: [JuegosPage]
})
export class JuegosPageModule {}
