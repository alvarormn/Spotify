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
    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      results => {
        console.log(results)
        /*let user = results;
        this.user_register = user;

        if (!user._id) {
          console.error("Error al registrarse");
        } else {

        }*/

      },
      error => {
        let alertRegister = <any>error;
        if (alertRegister != null){
          //this.errorMessage = error;
          console.log(alertRegister.error.message)
        }
      }
    )

  }

}
