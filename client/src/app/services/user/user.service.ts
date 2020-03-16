import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global'

@Injectable()
export class UserService {
  url: string;
  identity;
  token;
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url('user');
  }

  signup(user_to_login, gethash): Observable<any>{

    if (gethash != null) {
      user_to_login.gethash = gethash;
    }
    let json = JSON.stringify(user_to_login);
    let params = json;

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'/login', params, {headers: headers});

  }

  getIdentity(){
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity != undefined) {
      this.identity = identity;
    } else {
      this.identity = null
    }
    return this.identity;
  }

  getToken(){
    const token = localStorage.getItem('token');
    if (token != undefined) {
      this.token = token;
    } else {
      this.token = null
    }
    return this.token;
  }

}
