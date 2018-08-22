import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginDeletePage } from './login-delete';

@NgModule({
  declarations: [
    LoginDeletePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginDeletePage),
  ],
})
export class LoginDeletePageModule {}
