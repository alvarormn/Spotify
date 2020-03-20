import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { UserService } from './services/user/user.service'
import { User } from './models/user';
import { REGEX } from './assets/regex'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  title = 'Musify';
  user: User;
  user_register: User;
  identity;
  token;
  errorMessage;
  alertRegister;
  successReg;
  valEmail = REGEX.valEmail;

  constructor(
    private _userService:UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');
    this.user_register = new User('','','','','','ROLE_USER','');
  }

  //ngOnInit se utuliza para ejecutar este código antes de ejecutar el componente
  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log(this.identity)
    console.log(this.token)
  }

  onSubmit(){
    this.errorMessage= null;


    this._userService.signup(this.user, true).subscribe(
      results => {
        const token = results.token;
        this.token = token;
        const identity = results.user;
        this.identity = identity;
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
          console.log(errorMessage.error.message)
        }
      }
    )
  }

  logout(){
    localStorage.clear();
    this.identity = null;
  }

  onSubmitRegister(){
    //console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      results => {
        let user = results.user;
        this.user_register = user;

        if (!user._id) {
          this.alertRegister = {error: "Error al registrarse"};
        } else {
          this.successReg = {message: "Successful registration"}
          console.log(this.successReg);
          this.user_register = new User('','','','','','ROLE_USER','');
        }

      },
      error => {
        let alertRegister = <any>error;
        if (alertRegister != null){
          this.alertRegister = error;
          console.log(alertRegister.error.message)
        }
      }
    )

  }

}
