import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferPage } from './transfer';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    TransferPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferPage),
    NgxQRCodeModule
  ],
})
export class TransferPageModule {}
