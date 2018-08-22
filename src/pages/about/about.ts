import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  user = {
    name: 'King Corporation Co.,Ltd.',
    profileImage: 'assets/imgs/avatar/girl-avatar.png',
    coverImage: 'assets/imgs/background/background-5.jpg',
    occupation: 'Designer',
    location: 'IT Support, KC',
    description: 'โปรแกรม Pallet Transfer ใชัสำหรับ รับ-ส่ง สินค้าสำเร็จรูปแบบอัตโนมัติ ระหว่างฝ่ายผลิตและฝ่ายคลังสินค้า.',
  };  
  public _uname: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
      this.storage.get('username').then(user => {
        if (user === null) { this._uname = ''; }
        else { this._uname = user; }
      });      
  }
  openpage(page: string) {
    this.navCtrl.push(page);
  }
}
