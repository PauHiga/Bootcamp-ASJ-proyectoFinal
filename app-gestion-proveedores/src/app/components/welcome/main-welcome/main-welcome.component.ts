import { Component, OnInit } from '@angular/core';
import { WelcomeService } from '../../../services/welcome.service';

@Component({
  selector: 'app-main-welcome',
  templateUrl: './main-welcome.component.html',
  styleUrl: './main-welcome.component.css'
})
export class MainWelcomeComponent implements OnInit{

  constructor(public welcomeService: WelcomeService){}

  suppliersTotal : number = 0;
  suppliersActive : number = 0;
  suppliersInactive : number = 0;
  productsTotal : number = 0;
  productsActive : number = 0;
  productsInactive : number = 0;
  ordersTotal : number = 0;
  ordersActive : number = 0;
  ordersInactive : number = 0;

  ngOnInit(): void {
    this.getCounts();
  }

  getCounts(){
    this.welcomeService.getSuppliersCount().subscribe((response)=>{
      console.log(response);
      this.suppliersTotal = response
    })
    this.welcomeService.getSuppliersCount(false).subscribe((response)=>{
      this.suppliersActive = response
    })
    this.welcomeService.getSuppliersCount(true).subscribe((response)=>{
      this.suppliersInactive = response
    })
    this.welcomeService.getProductsCount().subscribe((response)=>{
      this.productsTotal = response
    })
    this.welcomeService.getProductsCount(false).subscribe((response)=>{
      this.productsActive = response
    })
    this.welcomeService.getProductsCount(true).subscribe((response)=>{
      this.productsInactive = response
    })
    this.welcomeService.getOrdersCount().subscribe((response)=>{
      this.ordersTotal = response
    })
    this.welcomeService.getOrdersCount(false).subscribe((response)=>{
      this.ordersActive = response
    })
    this.welcomeService.getOrdersCount(true).subscribe((response)=>{
      this.ordersInactive = response
    })
  }
}
