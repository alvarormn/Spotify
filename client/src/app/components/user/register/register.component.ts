import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { UserService } from '../../../services/user/user.service'
import { User } from '../../../models/user';
import { REGEX } from '../../../assets/regex';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  user_register: User;
  identity;
  alertRegister;
  successReg;
  valEmail = REGEX.valEmail;

  constructor(
    private _userService:UserService,
  ) {
    this.user_register = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    //this.token = this._userService.getToken();
  }

  onSubmitRegister(){

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
          console.log(alertRegister.error.message);
        }
      }
    )

  }

}
