import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { UserModel } from '../../Models/user.model';
import { Storage } from '@ionic/storage';
@Injectable()
export class AuthServiceProvider {
  constructor(
    private http: HttpClient,
    private storage: Storage,
    @Inject('url_server') private url: string,
  ) {
    this.storage.get('urlserver').then(url => {
      if (url !== null) { this.url = url; }
    });     
  }
  getToken(_user: UserModel) {
    let _params = new HttpParams()
      .set('zclient', _user.zclient)
      .set('username', _user.username.toUpperCase())
      .set('password', _user.password.toUpperCase());
    return new Promise((res, rej) => {
      this.http.get(this.url + '/token/get', { params: _params }).subscribe(
        d => {
          res(d);
          if (d === 'Unauthorized') {
            this.storage.remove('id_token');
            this.storage.remove('password');
          }
          else {
            this.storage.set("zclient", _user.zclient);
            this.storage.set("username", _user.username.toUpperCase());
            this.storage.set("password", _user.password.toUpperCase());
            if (_user.remember === true)
            { this.storage.set("remember", 'true'); }
            else
            { this.storage.set("remember", 'false'); }
            this.storage.set("id_token", d);            
          }
        },
        e => {
          rej(e);
          this.storage.remove('id_token');
        }
      );
    });
  }
  getPallet(_token: string,_client:string,_pallet: string,_option:string) {
    let _headers = {
      'Authorization': 'Bearer ' + _token
    };
    let _params = new HttpParams()
      .set('zclient', _client)
      .set('palletno', _pallet)
      .set('zoption', _option);
    return new Promise((res, rej) => {
      this.http.get(this.url + '/Zmmim03/Pallet_Chk', { params: _params, headers: _headers }).subscribe(
        d => { res(d); },
        e => { rej(e); }
      );
    });
  }
  postPallet(_token: string, _client:string, _pallet: string, _storage: string) {
    let _headers = {
      'Authorization': 'Bearer ' + _token
    };
    let _params = new HttpParams()
      .set('zclient', _client)
      .set('palletno', _pallet)
      .set('storage', _storage);
    return new Promise((res, rej) => {
      this.http.get(this.url + '/Zmmim03/Transfer', { params: _params, headers: _headers }).subscribe(
        d => { res(d); },
        e => { rej(e); }
      );
    });
  }
  cancelPallet(_token:string,_client:string,_pallet:string) {
    let _headers = { 'Authorization': 'Bearer ' + _token };
    let _params = new HttpParams()
      .set('zclient', _client)
      .set('palletno', _pallet);
    return new Promise((res, rej) => {
      this.http.get(this.url + '/Zmmim03/Cancel', { params: _params, headers: _headers }).subscribe(
        d => { res(d); },
        e => { rej(e); }
      );
    });
  }

  reportPallet(_token: string,_client:string, _date: string) {
    let _headers = { 'Authorization': 'Bearer ' + _token };
    let _params = new HttpParams().set('zclient', _client).set('im_date', _date);
    return new Promise((res, rej) => {
      this.http.get(this.url + '/Zmmim03/Report', { params: _params, headers: _headers }).subscribe(
        d => { res(d); },
        e => { rej(e); }
      );
    });
  }

  login_c(_token: string,zclient:string, im_user:string, im_pwd:string, im_full:string ) {
    let _headers = { 'Authorization': 'Bearer ' + _token };
    let _params = new HttpParams()
      .set('zclient', zclient)
      .set('im_user', im_user)
      .set('im_pwd' , im_pwd)
      .set('im_full', im_full);
    return new Promise((res, rej) => {
      this.http.get(this.url + '/Zmmim03/Login_c', { params: _params, headers: _headers }).subscribe(
        d => { res(d); },
        e => { rej(e); }
      );
    });    
  }
  login_u(_token: string,zclient:string, im_user:string, im_pwd:string, im_full:string, im_newpwd:string ) {
    let _headers = { 'Authorization': 'Bearer ' + _token };
    let _params = new HttpParams()
      .set('zclient', zclient)
      .set('im_user', im_user)
      .set('im_pwd' , im_pwd)
      .set('im_full', im_full)
      .set('im_newpwd', im_newpwd);
    return new Promise((res, rej) => {
      this.http.get(this.url + '/Zmmim03/Login_u', { params: _params, headers: _headers }).subscribe(
        d => { res(d); },
        e => { rej(e); }
      );
    });    
  }  
  login_d(_token: string,zclient:string, im_user:string, im_pwd:string) {
    let _headers = { 'Authorization': 'Bearer ' + _token };
    let _params = new HttpParams()
      .set('zclient', zclient)
      .set('im_user', im_user)
      .set('im_pwd', im_pwd);
    return new Promise((res, rej) => {
      this.http.get(this.url + '/Zmmim03/Login_d', { params: _params, headers: _headers }).subscribe(
        d => { res(d); },
        e => { rej(e); }
      );
    });    
  }   
}
