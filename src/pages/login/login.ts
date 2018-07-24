import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserModel } from '../../Models/user.model';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public result: any;
  public errors: any;
  public errmsg: string;
  public _user: UserModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public _authservice: AuthServiceProvider,
  ) {
   this._user =
      {
        username: '',
        password: ''
      };
    this.storage.get('username').then(user => {
      if (user === null) { this._user.username = ''; }
      else { this._user.username = user; }
    });
    this.storage.get('id_token').then(token => {
      if (token === null) { this.result = 'Not Found'; }
      else { this.result = token; }
    });
  }
  onClickLogin() { this.getTokens(this._user); }
  // openPage(page: string) {
    // this.navCtrl.push(page);
    // this.result = '';
    // this.errmsg = '';
  // }
  getTokens(_u: UserModel) {
    this.result = '';
    this.errmsg = '';
    this._authservice.getToken(_u)
      .then(
        (d) => { this.result = d; },
        (e) => { this.errors = e; this.errmsg = Object(e).name; }
      );
  }

  // getValue() {
    // this.storage.remove('username');
    // this.storage.remove('id_token');
  // }
}
