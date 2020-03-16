import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { UserService } from './services/user/user.service'
import { User } from './models/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  title = 'Musify';
  user: User;
  identity = true;
  token;
  errorMessage;

  constructor(
    private _userService:UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');
  }

  //ngOnInit se utuliza para ejecutar este código antes de ejecutar el componente
  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log(this.identity)
    console.log(this.token)
  }

  onSubmit(){

    this._userService.signup(this.user, null).subscribe(
      results => {
        this.errorMessage= null;

        let identity = results.user;
        this.identity = identity;

        if (!identity._id) {
          console.error("El usuario no está correctamente identificado")
        } else {

          this._userService.signup(this.user, true).subscribe(
            results => {
              let token = results.token;
              this.token = token;

              if (this.token.length <= 0) {
                console.error("El token no se ha generado")
              } else {
                localStorage.setItem('identity', JSON.stringify(identity));
                localStorage.setItem('token', token);
                //console.log(identity);
                //console.log(token);
              }

            },
            error => {
              let errorMessage = <any>error;
              if (errorMessage != null){

                //console.log(errorMessage.error)
                this.errorMessage = error;
                console.log(errorMessage.error.message)
              }
            }
          );
        }

      },
      error => {
        let errorMessage = <any>error;
        if (errorMessage != null){

          //console.log(errorMessage.error)
          this.errorMessage = error;
          console.log(errorMessage.error.message)
        }
      }
    );
  }
}
