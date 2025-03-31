import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CamaraPage } from './Camara.page';

const routes: Routes = [
  {
    path: '',
    component: CamaraPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamaraPageRoutingModule {}
