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

  orders : orden[]= [];
  
  ngOnInit(): void {
    this.createOrdersList();
  }

  createOrdersList(){
    this.ordersService.getOrders().subscribe( (response) => {
      this.orders = response;
    })
  }
  markCanceled(id:string){
    const orderToCancel = this.orders.find(item=> item.id == id)
    this.ordersService.markAsCanceled(orderToCancel).subscribe((response)=>{
      console.log(response)
    });
    this.createOrdersList();
  }

}
