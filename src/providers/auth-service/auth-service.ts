import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { UserModel } from '../../Models/user.model';
@Injectable()
export class AuthServiceProvider {

  constructor(
    public http: HttpClient,
    @Inject('url_server') private url: string
  ) { }
  getToken(_user:UserModel) {
    let _params = new HttpParams()
      .set('username', _user.username)
      .set('password', _user.password);
    return new Promise((res, rej) => {
      this.http.get(this.url+'/token', { params: _params }).subscribe(
        d => { res(d); },
        e => { rej(e); }
      );
    });
  }
}
