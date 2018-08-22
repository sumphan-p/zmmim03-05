import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-login-profile',
  templateUrl: 'login-profile.html',
})
export class LoginProfilePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }
}
