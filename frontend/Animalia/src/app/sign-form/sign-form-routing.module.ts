import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignFormPage } from './sign-form.page';

const routes: Routes = [
  {
    path: '',
    component: SignFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignFormPageRoutingModule {}
