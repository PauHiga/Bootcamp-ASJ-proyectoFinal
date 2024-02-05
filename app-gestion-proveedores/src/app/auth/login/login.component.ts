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

  message: String =""

  constructor(public authService: AuthenticationService, public router: Router) {}

  onClickForm(loginForm:NgForm){
    console.log('click');
    this.message = 'Trying to log in ...';

    if(!loginForm.valid){
      this.message = "Please complete Username and Password";
    }else{
      this.authService.login(this.loginData).subscribe((response) => {
        console.log(response);
        this.authService.isLoggedIn = true;
        this.router.navigate(['']);
      },
      (error)=>{
        console.log(error);
        this.message = error.error.message;
      });
    }
  }
}