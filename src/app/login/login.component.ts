import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error = '';

  constructor(private userService: UsersService) { }

  async signIn(f: NgForm) {
    let username = f.controls.username.value;
    let password = f.controls.password.value;
    this.userService.signinUser(username, password).catch(error => this.error = 'Wrong user or password');
  }

}
