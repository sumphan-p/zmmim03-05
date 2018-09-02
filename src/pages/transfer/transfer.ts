import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ExReturnModel } from '../../Models/ex_return.model';
import { ExPalletModel } from '../../Models/ex_pallet.model';
@IonicPage()
@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
  providers: [BarcodeScanner]
})
export class TransferPage {
  token: any;
  scannedCode = null;
  storageloc = null;
  public result: any;
  public errors: any;
  public errmsg: string;
  public _vreturn: any;
  public _vpallet: any;
  public _return: ExReturnModel;
  public _pallet: ExPalletModel;
  public _client: string;
  public _status: boolean;
  public _response: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private storage: Storage,
    private _authservice: AuthServiceProvider,
  ) {
  }
  ionViewWillEnter() {
    this.storage.get('id_token').then(token => {
      if (token === null) { this.token = ''; }
      else { this.token = token; }
    });
    this.storage.get('zclient').then(client => {
      if (client === null) { this._client = ''; }
      else { this._client = client; }
    });
  }
  scanCode() {
    if (!this.scannedCode) {
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
        this.getPallet();
      }, (err) => {
        console.log('Error: ', err);
      });
    }
    else {
      this.storageloc = null;
      this.result = null;
      this.errors = null;
      this.errmsg = null;
      this._vreturn = null;
      this._vpallet = null;
      this._status = null;
      this._response = null;
      this.getPallet();
    }
  }
  getPallet() {
    this.result = null;
    this.errors = null;
    this.errmsg = null;
    this._return = null;
    this._pallet = null;
    this._vreturn = null;
    this._vpallet = null;
    this._status = false;
    this._authservice.getPallet(this.token, this._client, this.scannedCode, 'F')
      .then(
        (d) => {
          this.result = JSON.stringify(d);
          this._return = d[0];
          this._vreturn = this._return[0];
          this._pallet = d[1];
          this._vpallet = this._pallet[0];
          this.storageloc = this._vpallet.TO_SLOC;
          if (this._vreturn.MESSAGE_TYPE === 'E') {
            this._status = true;
            this.errmsg = this._vreturn.MESSAGE;
          }
          else {
            if (this._vpallet.POST_IND === 'X') {
              this._status = true;
              this.errmsg = 'The Pallet has already posted';
            }
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
    this.scannedCode = null;
    this.storageloc = null;
    this.result = null;
    this.errors = null;
    this.errmsg = null;
    this._vreturn = null;
    this._vpallet = null;
    this._status = null;
    this._response = null;
  }
  PostData() {
    this.result = null;
    this.errors = null;
    this.errmsg = null;
    this._return = null;
    this._vreturn = null;
    this._status = null;
    this._response = false;
    this._authservice.postPallet(this.token, this._client, this.scannedCode, this.storageloc)
      .then(
        (d) => {
          this.result = JSON.stringify(d);
          this._return = d[0];
          this._vreturn = this._return[0];
          this._response = true;
          if (this._vreturn.MESSAGE_TYPE === 'E') {
            this.errmsg = this._vreturn.MESSAGE;
          }
        },
        (e) => {
          this.errors = e;
          this._response = true;
          this.errmsg = Object(e).name;
        }
      );
  }
  ionViewDidLeave(){
    this.ClearData();
  }
}
