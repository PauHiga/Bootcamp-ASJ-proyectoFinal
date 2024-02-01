import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentRoute : number = 0;

  constructor(private router: Router) {
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
}