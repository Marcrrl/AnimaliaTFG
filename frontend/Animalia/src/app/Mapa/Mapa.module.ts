import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MapaPageRoutingModule } from './Mapa-routing.module';
import { MapaPage } from './Mapa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPageRoutingModule
  ],
  declarations: [MapaPage]
})
export class MapaPageModule {}
