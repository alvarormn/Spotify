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
export class AppComponent  implements OnInit{
  title = 'Musify';
  user: User;
  identity = true;
  token;

  constructor(
    private _userService:UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');
  }

  //ngOnInit se utuliza para ejecutar este código antes de ejecutar el componente
  ngOnInit(){

  }

  onSubmit(){
    this._userService.signup(this.user).subscribe(
      response => {
        console.log(response)
      },
      error => {
        let errorMessage = <any>error;
        if (errorMessage != null){
          console.error(error)
        }
      }
    );
  }

}
