import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersServiceService } from '../../../services/orders-service.service';
import { orden } from '../../../models/orden';
import { forkJoin } from 'rxjs';
import { proveedor } from '../../../models/proveedores';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent implements OnInit{

  constructor(public ordersService: OrdersServiceService, private route:ActivatedRoute, private router:Router){}

  orders : orden[]= [];
  ordersToDisplay : orden[]= [];
  
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    forkJoin([
      this.ordersService.getOrders(),
      this.ordersService.getSuppliers()
    ]).subscribe(([orders, suppliers]) => {
      this.orders = orders;
      this.ordersToDisplay = orders.map((item:orden) => {
        const proveedor = suppliers.find((supplier : proveedor) => supplier.id == item.proveedor)
        let itemConProveedor = {...item, proveedor: "Proveedor dado de baja"}
        if(proveedor){
          itemConProveedor = {...item, proveedor: proveedor.razonSocial}
        } 
        return itemConProveedor 
      })
    });
  }

  markCanceled(id:string){
    const confirmacion = confirm("Está por cancelar esta orden. ¿Desea continuar?")
    if(confirmacion){
      const orderToCancel = this.orders.find(item=> item.id == id)
      this.ordersService.markAsCanceled(orderToCancel).subscribe((response)=>{
        console.log(response)
      });
      this.getData();
      alert("Orden Cancelada")
    }
  }

}
