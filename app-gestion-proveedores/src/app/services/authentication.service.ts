import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of, tap } from 'rxjs';
import { UserLogin } from '../models/userLogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router){
    if(sessionStorage.getItem("password") != null){
      this.isLoggedIn = true;
      this.username = String(sessionStorage.getItem("user"))
    }
  }

  URL_API = 'http://localhost:8080/login'

  isLoggedIn : boolean = false;
  username = "";

  login(userLogin: UserLogin): Observable<any> {                   
    return this.http.post<any>(this.URL_API, userLogin).pipe(
      map((response) => {
        console.log(response);
        this.isLoggedIn = true;
        this.username = response.username;
        sessionStorage.setItem("user", response.username);
        sessionStorage.setItem("email", userLogin.email);
        sessionStorage.setItem("password", userLogin.password);
        return response;
      }),
      catchError((error) => {
        console.log(error);
        this.isLoggedIn = false;
        if(error.status == 403){
          return of(error.error); // Wrapping the error in an observable
        } else {
          return of({message: "An error has occurred, and the login process is currently unavailable."})
        }
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    this.isLoggedIn = false;
  }
}
