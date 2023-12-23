import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersServiceService } from '../../../services/orders-service.service';
import { orden } from '../../../models/orden';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent implements OnInit{

  constructor(public ordersService: OrdersServiceService, private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.orders = this.ordersService.getOrders();
  }

orders : orden[]= [];

markCanceled(id:number){
  this.ordersService.markAsCanceled(id)
  this.orders = this.ordersService.getOrders();
}

}
