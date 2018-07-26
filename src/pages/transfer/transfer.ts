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
  scannedCode = null;
  token: any;
  public result: any;
  public errors: any;
  public errmsg: string;
  public _return : ExReturnModel;  
  public _pallet : ExPalletModel; 
  public _vreturn : any;  
  public _vpallet : any;   
   // public _return: ExReturnModel[] = [];    
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
  }
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.getPallet();
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  getPallet() {
    this.result = '';
    this.errmsg = '';
    this._authservice.getPallet(this.token, this.scannedCode)
      .then(
        (d) => {
          this.result = JSON.stringify(d);
          this._return = d[0];
          this._vreturn = this._return[0];          
          this._pallet = d[1];
          this._vpallet = this._pallet[0];
        },
        (e) => { this.errors = e; this.errmsg = Object(e).name; }
      );
  }
  ClearData() {
    this.result = '';
    this.errmsg = '';
    this.scannedCode = '';
  }
}
