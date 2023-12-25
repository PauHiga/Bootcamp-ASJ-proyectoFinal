import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersServiceService } from '../../../services/orders-service.service';


@Component({
  selector: 'app-form-orders',
  templateUrl: './form-orders.component.html',
  styleUrl: './form-orders.component.css'
})
export class FormOrdersComponent implements OnInit{

  constructor(public orderService: OrdersServiceService, private router:Router){}


  ngOnInit(): void {
      this.orderService.clearOrderData()
  }

  onClickForm(formularioProveedores:NgForm){
    this.orderService.saveOrder().subscribe((response)=>{
      console.log(response);
    })
    this.orderService.clearOrderData()
    this.router.navigate(["ordenes"])
  }

}
