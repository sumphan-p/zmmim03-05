import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserModel } from '../../Models/user.model';
@IonicPage()
@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {
  public _user: UserModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
      this._user =
        {
        zclient : '',
        username: '',
        password: '',
        fullname: '',
        remember: false        
      };
  }
  onRegister() {
    
  }
}
