import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RescatesPage } from './rescates.page';

const routes: Routes = [
  {
    path: '',
    component: RescatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RescatesPageRoutingModule {}
