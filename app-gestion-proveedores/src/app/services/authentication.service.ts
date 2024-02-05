import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';
import { UserLogin } from '../models/userLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient){}

  URL_API = 'http://localhost:8080/login'

  isLoggedIn = false;

  login(userLogin: UserLogin): Observable<String> {
    return this.http.post<String>(this.URL_API, userLogin)
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
