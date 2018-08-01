import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelPage } from './cancel';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    CancelPage,
  ],
  imports: [
    IonicPageModule.forChild(CancelPage),
    NgxQRCodeModule
  ],
})
export class CancelPageModule {}
