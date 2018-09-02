import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserModel } from '../../Models/user.model';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  public _login: FormGroup;
  public _zclient: string;
  public _remember: boolean;
  public _urlserver: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public _authservice: AuthServiceProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
  ) {
    this._user =
      {
        zclient: '',
        username: '',
        password: '',
        fullname: '',
        remember: false
      };
    this._login = this.formBuilder.group({
      zclient: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      fullname: ['', Validators.compose([Validators.maxLength(150)])],
    });
    this.storage.get('urlserver').then(url => {
      if (url === null) { this._urlserver = ''; }
      else { this._urlserver = url; }
    });    
    this.storage.get('zclient').then(client => {
      if (client === null) { this._user.zclient = ''; }
      else { this._user.zclient = client; }
    });
    this.storage.get('username').then(user => {
      if (user === null) { this._user.username = ''; }
      else { this._user.username = user; }
    });
    this.storage.get('remember').then(remem => {
      if (remem === null) { this._user.remember = false; }
      else {
        if (remem === 'true') {
          this._user.remember = true;
          this.storage.get('password').then(pwd => {
            if (pwd === null) { this._user.password = ''; }
            else { this._user.password = pwd; }
          });          
        } else {
          this._user.remember = false;
        }
      }
    });
    this.storage.get('id_token').then(token => {
      if (token === null) { this.result = ''; }
      else { this.result = token; }
    });
  }

  onClickLogin() {
    this.getTokens(this._user);
  }
  redirectTo(page: string) {
    this.navCtrl.setRoot(page);
  }
  getTokens(_u: UserModel) {
    this.result = '';
    this.errmsg = '';
    this._authservice.getToken(_u)
      .then(
        (d) => {
          this.result = d;
          if (this.result === 'Unauthorized') {
            this.errors = 'E'; this.errmsg = this.result;
          } else {
            this.redirectTo('TabsPage');
          }
        },
        (e) => {
          this.errors = e;
          this.errmsg = Object(e).name;
        }
      );
  }
  AlertClient() {
    let v220: boolean = false;
    let v410: boolean = false;
    let v510: boolean = false;
    let v520: boolean = false;
    let v910: boolean = false;
    switch ('C' + this._user.zclient) {
      case 'C220': {
        v220 = true;
        break;
      }
      case 'C410': {
        v410 = true;
        break;
      }
      case 'C510': {
        v510 = true;
        break;
      }
      case 'C520': {
        v520 = true;
        break;
      }
      case 'C910': {
        v910 = true;
        break;
      }
      default: {
        break;
      }
    }
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Client');
    alert.addInput({
      type: 'radio',
      label: '220',
      value: '220',
      checked: v220
    });
    alert.addInput({
      type: 'radio',
      label: '410',
      value: '410',
      checked: v410
    });
    alert.addInput({
      type: 'radio',
      label: '510',
      value: '510',
      checked: v510
    });
    alert.addInput({
      type: 'radio',
      label: '520',
      value: '520',
      checked: v520
    });
    alert.addInput({
      type: 'radio',
      label: '910',
      value: '910',
      checked: v910
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data !== null) {
          this._user.zclient = data;
        }
      }
    });
    alert.present();
  }
  AlertRemember() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Remember Password');
    alert.addInput({
      type: 'checkbox',
      label: 'Remember',
      value: String(this._user.remember),
      checked: this._user.remember
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data !== null) {
          if (data == 'true') {
            this._user.remember = true;
          } else if (data == 'false') {
            this._user.remember = true;
          }
          else {
            this._user.remember = false;
          }
        }
      }
    });
    alert.present();
  }
  AlertUrl() {
    let url137: boolean = false;
    let url110: boolean = false;
    let url161: boolean = false;
    switch (this._urlserver) {
      case 'http://192.168.137.1/webapi_jwt/api': {
        url137 = true;
        break;
      }
      case 'http://192.168.12.110/webapi_jwt/api': {
        url110 = true;
        break;
      }
      case 'http://192.168.12.161/webapi_jwt/api': {
        url161 = true;
        break;
      }      
      default: {
        break;
      }
    }    
    let alert = this.alertCtrl.create();
    alert.setTitle('Select IP Address');
    alert.addInput({
      type: 'radio',
      label: '192.168.137.1',
      value: 'http://192.168.137.1/webapi_jwt/api',
      checked: url137
    });
    alert.addInput({
      type: 'radio',
      label: '192.168.12.110',
      value: 'http://192.168.12.110/webapi_jwt/api',
      checked: url110
    });
    alert.addInput({
      type: 'radio',
      label: '192.168.12.161',
      value: 'http://192.168.12.161/webapi_jwt/api',
      checked: url161
    });    
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data !== null) {
          this._urlserver = data;
          this.storage.set("urlserver", data);
        }
      }
    });
    alert.present();
  }

}
