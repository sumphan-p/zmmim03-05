import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  TransferPage = 'TransferPage';
  CancelPage   = 'CancelPage';
  ReportPage   = 'ReportPage';
  AboutPage    = 'AboutPage';  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }
}
