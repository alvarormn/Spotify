import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { UserService } from './services/user/user.service'
import { User } from './models/user';
import { REGEX } from './assets/regex';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  title = 'Musify';
  identity;
  token;


  constructor(
    private _userService:UserService,
  ){
  }

  //ngOnInit se utuliza para ejecutar este código antes de ejecutar el componente
  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this.token = null;

    window.location.reload();
  }

}
