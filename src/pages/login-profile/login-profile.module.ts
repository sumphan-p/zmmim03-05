import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginProfilePage } from './login-profile';

@NgModule({
  declarations: [
    LoginProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginProfilePage),
  ],
})
export class LoginProfilePageModule {}
