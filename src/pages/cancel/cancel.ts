import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
import { ExReturnModel } from '../../Models/ex_return.model';
import { ExPalletModel } from '../../Models/ex_pallet.model';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
@IonicPage()
@Component({
  selector: 'page-cancel',
  templateUrl: 'cancel.html',
})
export class CancelPage {
  token: any;
  scannedCode = null;
  // storageloc = null;


  public result: any;
  public errors: any;
  public errmsg: string;

  public _vreturn: any;
  public _vpallet: any;
  public _return: ExReturnModel;
  public _pallet: ExPalletModel;

  public _status: boolean;
  public _response: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private barcodeScanner: BarcodeScanner,
    // private storage: Storage,
    // private _authservice: AuthServiceProvider,
  ) {
  }
  ionViewWillEnter() {
    // this.storage.get('id_token').then(token => {
    //   if (token === null) { this.token = ''; }
    //   else { this.token = token; }
    // });
  }
  scanCode() {
    if (!this.scannedCode) {
      // this.barcodeScanner.scan().then(barcodeData => {
        // this.scannedCode = barcodeData.text;
        // this.getPallet();
      // }, (err) => {
        // console.log('Error: ', err);
      // });
    // }
    // else {
      //  this.getPallet();
    }
  }
  // getPallet() {
  //   this.result = null;
  //   this.errors = null;
  //   this.errmsg = null;

  //   this._return = null;
  //   this._pallet = null;
  //   this._vreturn = null;
  //   this._vpallet = null;
  //   this._status = false;
  //   this._authservice.getPallet(this.token, this.scannedCode)
  //     .then(
  //       (d) => {
  //         this.result = JSON.stringify(d);
  //         this._return = d[0];
  //         this._vreturn = this._return[0];
  //         this._pallet = d[1];
  //         this._vpallet = this._pallet[0];
  //         if (this._vreturn.MESSAGE_TYPE === 'E') {
  //           this._status = true;
  //           this.errmsg = this._vreturn.MESSAGE;
  //         }
  //       },
  //       (e) => {
  //         this.errors = e;
  //         this._status = true;
  //         this.errmsg = Object(e).name;
  //       }
  //     );
  // }
  // ClearData() {
  //   this.scannedCode = null;
  //   // this.storageloc = null;
  //   this.result = null;
  //   this.errors = null;
  //   this.errmsg = null;
  //   this._vreturn = null;
  //   this._vpallet = null;
  //   this._status = null;
  //   this._response = null;
  // }
  // CancelData() {
  //   this.result = null;
  //   this.errors = null;
  //   this.errmsg = null;
  //   this._return = null;
  //   this._vreturn = null;
  //   this._status = null;
  //   this._response = false;
  //   this._authservice.postPallet(this.token, this.scannedCode, this.storageloc)
  //     .then(
  //       (d) => {
  //         this.result = JSON.stringify(d);
  //         this._return = d[0];
  //         this._vreturn = this._return[0];
  //         this._response = true;          
  //         // if (this._vreturn.MESSAGE_TYPE === 'E') {
  //           this.errmsg = 'sumphan';
  //         // }
  //       },
  //       (e) => {
  //         this.errors = e;
  //         this._response = true;
  //         this.errmsg = Object(e).name;
  //       }
  //     );
  // }
}
