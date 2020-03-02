import { Component } from '@angular/core';
import * as $ from 'jquery';

import { User } from './models/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Musify';
  user: User;
  identity = true;
  token;

  constructor(){
    this.user = new User('','','','','','ROLE_USER','');
  }

  onSubmit(){
    console.log(this.user)
  }

}
