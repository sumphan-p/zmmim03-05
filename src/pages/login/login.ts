import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserModel } from '../../Models/user.model';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public result: any;
  public errors: any;
  public errmsg: string;  
  public lvalue: any;
  public _user: UserModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _authservice: AuthServiceProvider,        
  ) {
    this._user =
      {
        username: 'kamonwan',
        password: 'boonpiturak'
      };      
  }
  onClickLogin() { this.getTokens(this._user); }
  openPage(page: string) {
    // this.navCtrl.push(page);
    this.result = ''; 
    this.errmsg = '';
    this.lvalue = '';
  }  
  getTokens(_u:UserModel) {
    this.result = '';
    this.errmsg = '';
    this._authservice.getToken(_u)
      .then(
        (d) => { this.result = d; },
        (e) => { this.errors = e; this.errmsg = Object(e).name; }
      );
  }  
}
