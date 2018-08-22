import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExReturnModel } from '../../Models/ex_return.model';
import { ExPalletModel } from '../../Models/ex_pallet.model';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  token: any;
  myDate = null;

  public result: any;
  public errors: any;
  public errmsg: string;

  public _vreturn: any;
  public _vpallet: any;
  public _return: ExReturnModel;
  public _pallet: ExPalletModel;
  public _client: string;
  public _status: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private _authservice: AuthServiceProvider,
  ) {
    this.storage.get('id_token').then(token => {
      if (token === null) { this.token = ''; }
      else { this.token = token; }
    });
    this.storage.get('zclient').then(client => {
      if (client === null) { this._client = ''; }
      else { this._client = client; }
    });   
    // this.myDate = new Date().toISOString();
  }
  scanCode() {
    this.result = null;
    this.errors = null;
    this.errmsg = null;
    this._return = null;
    this._pallet = null;
    this._vreturn = null;
    this._vpallet = null;
    this._status = false;
    this._authservice.reportPallet(this.token,this._client,this.myDate)
      .then(
        (d) => {
          this.result = JSON.stringify(d);
          this._return = d[0];
          this._vreturn = this._return[0];
          this._pallet = d[1];
          this._vpallet = this._pallet[0];
          if (this._vreturn.MESSAGE_TYPE === 'E') {
            this._status = true;
            this.errmsg = this._vreturn.MESSAGE;
          }
        },
        (e) => {
          this.errors = e;
          this._status = true;
          this.errmsg = Object(e).name;
        }
      );
  }
  ClearData() {
    this.result = null;
    this.errors = null;
    this.errmsg = null;
    this._vreturn = null;
    this._vpallet = null;
    this._status = null;
  }
}
