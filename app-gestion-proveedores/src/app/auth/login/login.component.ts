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
    email: "",
    name: "",
    password: ""
  }

  message: String = ""

  inputType : "text" | "password" = "password"

  constructor(private authService: AuthenticationService, private router: Router) {}

  onClickForm(loginForm:NgForm){
    console.log('click');
    this.message = 'Trying to log in ...';

    if(!loginForm.valid){
      this.message = "Please complete Email and Password";
    }else{
      this.authService.login(this.loginData).subscribe((response)=>{
        this.message = response.message;
        if(response.status){
          this.router.navigate(['']);
        }
      });
    }
  }

  toggleInputType() {
    this.inputType = (this.inputType === 'text') ? 'password' : 'text';
  }

}