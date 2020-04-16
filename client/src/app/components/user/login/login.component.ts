import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { UserService } from '../../../services/user/user.service'
import { User } from '../../../models/user';
import { REGEX } from '../../../assets/regex'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit{
  user: User;
  identity;
  token;
  errorMessage;
  valEmail = REGEX.valEmail;

  constructor(
    private _userService:UserService,
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

        const token = results.token;
        this.token = token;
        const identity = results.user;
        this.identity = identity;

        if (identity._id && token.length > 0) {
          localStorage.setItem('identity', JSON.stringify(identity));
          localStorage.setItem('token', token);
          this.user = new User('','','','','','ROLE_USER','');
          window.location.reload();
        } else if (!identity._id) {
          console.error("El usuario no está correctamente identificado")
        } else if (token.length <= 0) {
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
