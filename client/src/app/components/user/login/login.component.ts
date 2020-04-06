import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { UserService } from '../../../services/user/user.service'
import { User } from '../../../models/user';
import { REGEX } from '../../../assets/regex'
import { Globals } from '../../../global'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit{
  user: User;
  //globals: Globals;
  identity;
  token;
  errorMessage;
  valEmail = REGEX.valEmail;

  constructor(
    private _userService:UserService
  ) {
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  onSubmit(){
    this.errorMessage= null;

    this._userService.signup(this.user, true).subscribe(
      results => {
        window.location.reload();
        const token = results.token;
        this.token = token;
        const identity = results.user;
        this.identity = identity;
        //this.identity = identity
        console.log(results)
        if (identity._id && this.token.length > 0) {
          localStorage.setItem('identity', JSON.stringify(identity));
          localStorage.setItem('token', token);
          this.user = new User('','','','','','ROLE_USER','');
        } else if (!identity._id) {
          console.error("El usuario no está correctamente identificado")
        } else if (this.token.length <= 0) {
          console.error("El token no se ha generado")
        }
      },
      error => {
        let errorMessage = <any>error;
        if (errorMessage != null){
          this.errorMessage = error;
          console.log(errorMessage.error.message);
        }
      }
    );

  }

}
