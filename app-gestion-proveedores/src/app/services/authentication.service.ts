import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(): Observable<boolean> {
    
    return of(true).pipe(
      delay(1000),
      tap(() => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}


//   private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   public isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

//   constructor() {}

//   login(token: string): void {
//     localStorage.setItem('token', token);
//     this.loggedInSubject.next(true);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.loggedInSubject.next(false);
//   }

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('token');
//   }
// }
