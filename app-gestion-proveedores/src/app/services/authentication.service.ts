import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of, tap } from 'rxjs';
import { UserLogin } from '../models/userLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient){}

  URL_API = 'http://localhost:8080/login'

  isLoggedIn = false;
  username = "";

  login(userLogin: UserLogin): Observable<any> {
    return this.http.post<any>(this.URL_API, userLogin).pipe(
      map((response) => {
        console.log(response);
        this.isLoggedIn = true;
        this.username = response.username;
        return response;
      }),
      catchError((error) => {
        console.log(error);
        this.isLoggedIn = false;
        return of(error.error); // Wrapping the error in an observable
      })
    );
  }



  // login(userLogin: UserLogin): any {
  //   this.http.post<any>(this.URL_API, userLogin).subscribe((response)=>{
  //     console.log(response);
  //     this.isLoggedIn = true;
  //     this.username = response.username;
  //     return response;
  //   }, 
  //   (error)=>{
  //     console.log(error);
  //     this.isLoggedIn = false;
  //     return error;
  //   })
  // }

  logout(): void {
    this.isLoggedIn = false;
  }
}
