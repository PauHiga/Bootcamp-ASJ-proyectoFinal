import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authenticationService :  AuthenticationService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(this.router.url.startsWith('/suppliers')){
          this.currentRoute = 1;
        } else if(this.router.url.startsWith('/products')){
          this.currentRoute = 2;
        }else if(this.router.url.startsWith('/orders')){
          this.currentRoute = 3;
        } else{
          this.currentRoute = 0;
        }
      }
    });
  }

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername(){
    this.username = this.authenticationService.username;
  }

  username : String = "";

  currentRoute : number = 0;

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}