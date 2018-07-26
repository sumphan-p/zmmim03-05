import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { UserModel } from '../../Models/user.model';
import { Storage } from '@ionic/storage';
@Injectable()
export class AuthServiceProvider {
  constructor(
    private http: HttpClient,
    private storage: Storage,
    @Inject('url_server') private url: string
  ) {
  }
  getToken(_user: UserModel) {
    let _params = new HttpParams()
      .set('username', _user.username)
      .set('password', _user.password);
    return new Promise((res, rej) => {
      this.http.get(this.url + '/token/get', { params: _params }).subscribe(
        d => {
          res(d);
          this.storage.set("username", _user.username);
          this.storage.set("id_token", d);
        },
        e => {
          rej(e);
          this.storage.remove('username');
          this.storage.remove('id_token');
        }
      );
    });
  }
  getPallet(_token:string,_pallet:string) {
    let _headers = {
      'Authorization' : 'Bearer '+ _token
    };
    let _params = new HttpParams()
      .set('palletno',_pallet);
    return new Promise((res, rej) => {
      this.http.get(this.url+'/Zmmim03/Pallet_Chk', { params:_params,headers:_headers}).subscribe(
        d => { res(d); },
        e => { rej(e); }
      );
    });    
  }  
}
