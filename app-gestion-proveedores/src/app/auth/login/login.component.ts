import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserLogin } from '../../models/userLogin';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData : UserLogin = {
    name: "",
    password: ""
  }

  message: string;

  constructor(public authService: AuthenticationService, public router: Router) {
    this.message = this.getMessage();
  }

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  onClickForm(loginForm:NgForm){
    console.log('click');
    this.message = 'Trying to log in ...';
    if(loginForm.valid){
      this.authService.login(this.loginData).subscribe((response) => {
        console.log(response);
        this.authService.isLoggedIn = true;
        this.message = this.getMessage();
        this.router.navigate(['']);
      },
      (error)=>{
        console.log(error);
        this.message = this.getMessage();
      });
    }
  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }
}