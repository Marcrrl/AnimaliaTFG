import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallesAnimalPage } from './detalles-animal.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesAnimalPageRoutingModule {}
