import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ExUserModel } from '../../Models/ex_user';
import { ExReturnModel } from '../../Models/ex_return.model';
import { UserModel } from '../../Models/user.model';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-login-delete',
  templateUrl: 'login-delete.html',
})
export class LoginDeletePage {
  public _user: UserModel;
  public _u: string;
  public _zclient: string;
  public _register: FormGroup;

  public token: any;
  public result: any;
  public errors: any;
  public errmsg: string;

  public _exreturn: any;
  public _exuser: any;
  public ex_return: ExReturnModel;
  public ex_user: ExUserModel;
  public _status: boolean;
  public _response: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private _authservice: AuthServiceProvider,
    public formBuilder: FormBuilder,
  ) {
    this._user =
      {
        zclient: '',
        username: '',
        password: '',
        fullname: '',
        remember: false
      };
      this._register = this.formBuilder.group({
        username: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
        // fullname: ['', Validators.compose([Validators.maxLength(150)])],
      });    
      this.storage.get('username').then(u => {
        if (u === null) {
          this._u = '';
          // this._user.username = '';
        }
        else {
          this._u = u;
          // this._user.username = u;
        }
      });
    // this.storage.get('password').then(pwd => {
    //   if (pwd === null) { this._user.password = ''; }
    //   else { this._user.password = pwd; }
    // });    
    this.storage.get('id_token').then(token => {
      if (token === null) { this.token = ''; }
      else { this.token = token; }
    });    
    this.storage.get('zclient').then(client => {
      if (client === null) { this._zclient = ''; }
      else { this._zclient = client; }
    });    
  }
  onClick(v: string) {
    if (v === 'C') {
      this.result = null;
      this.errors = null;
      this.errmsg = null;
      this._exreturn = null;
      this._exuser = null;
      this.ex_return = null;
      this.ex_user = null;
      this._status = false;
      this._authservice.login_d(this.token, this._zclient, this._user.username, this._user.password)
        .then(
          (d) => {
            this.result = JSON.stringify(d);
            this._exreturn = d[0];
            this.ex_return = this._exreturn[0];
            this._exuser = d[1];
            this.ex_user = this._exuser[0];
            if (this.ex_return.MESSAGE_TYPE === 'E') {
              this._status = true;
            } else if (this.ex_return.MESSAGE_TYPE === 'S') {
              this._status = false;
            } else {
              this._status = true;
              this.ex_return.MESSAGE_TYPE = 'E';
              this.ex_return.MESSAGE = 'SAP Error. ( Other )';
             }
          },
          (e) => {
            this.errors = e;
            this.errmsg = 'Connection failed !!! ' + Object(e).name;
            this._status = true;
            this.ex_return.MESSAGE_TYPE = 'E';
            this.ex_return.MESSAGE = this.errmsg;            
          }
        );
    } else {
      this._user.username = '';
      this._user.password = '';
      // this._user.fullname = '';

      this.result = null;
      this.errors = null;
      this.errmsg = null;
      this._exreturn = null;
      this._exuser = null;
      this.ex_return = null;
      this.ex_user = null;
      this._status = null;
    }
  }
}
