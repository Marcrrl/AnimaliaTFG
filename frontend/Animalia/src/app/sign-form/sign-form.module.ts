import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignFormPageRoutingModule } from './sign-form-routing.module';
import { SignFormPage } from './sign-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignFormPageRoutingModule
  ],
  declarations: [SignFormPage]
})
export class SignFormPageModule {}
