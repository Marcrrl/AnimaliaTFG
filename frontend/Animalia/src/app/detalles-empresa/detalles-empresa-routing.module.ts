import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesEmpresaPage } from './detalles-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesEmpresaPageRoutingModule {}
