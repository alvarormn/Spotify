import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { USERSET } from '../userSets'


@Injectable()
export class UserService {
  url: string;
  emailVal;
  identity;
  token;
  constructor(private _http: HttpClient) {
    this.url = USERSET.url('user');
  }

  signup(user_to_login, gethash): Observable<any>{
    if (gethash != null) {
      user_to_login.gethash = gethash;
    }
    let params = JSON.stringify(user_to_login);

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'/login', params, {headers: headers});

  }

  register(user_to_register): Observable<any>{
    const params = JSON.stringify(user_to_register);

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'/register', params, {headers: headers});
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
