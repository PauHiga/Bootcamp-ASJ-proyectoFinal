import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersServiceService } from '../../../services/orders-service.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { OrderDisplay } from '../../../models/orderDisplay';
import { Supplier } from '../../../models/supplier';
import { ProductDisplay } from '../../../models/productDisplay';
import { OrderDetailDisplay } from '../../../models/OrderDetailDisplay';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent implements OnInit{

  constructor(public ordersService: OrdersServiceService, private route:ActivatedRoute, private router:Router){}

  orders : OrderDisplay[]= [];
  ordersToDisplay : OrderDisplay[]= [];
  currentOrderDetails : OrderDetailDisplay[]= [];

  // ordersToDisplay : orden[]= [{
  //   id: "",
  //   numeroOrden: 0,
  //   fechaEmision: '',
  //   fechaEntrega: '',
  //   informacionRecepcion: '',
  //   proveedor: '',
  //   productos: [
  //     { id: '', nombreProducto: '', cantidad: 0 },
  //   ],
  //   total: 0,
  //   estado: 'NO CANCELADO'
  // }];

  ordersAvailable = 0;
  productsAvailable = 0;
  suppliersAvailable = 0;
  
  ngForIndex = 0

  ngOnInit(): void {
    this.getData();
    this.getAvailableProducts();
    this.getAvailableSuppliers();
  }

  getData() {
    forkJoin([
      this.ordersService.getOrders(),
      this.ordersService.getSuppliers()
    ]).subscribe(([orders, suppliers]) => {
      this.orders = orders;
      if(orders.length >0){
        this.ordersAvailable = orders.length;
        this.ordersToDisplay = orders.map((item:OrderDisplay) => {
          console.log(item);
          const supplier = suppliers.find((supplier : Supplier) => supplier.id == item.supplier.id)
          let itemConProveedor = {...item, supplier: "Proveedor dado de baja"}
          if(supplier){
            itemConProveedor = {...item, supplier: supplier.business_name}
          } 
          return itemConProveedor 
        })
      }
    });

    forkJoin([
      this.ordersService.getOrders(),
      this.ordersService.getSuppliers()
    ]).subscribe(([orders, suppliers]) => {
      this.orders = orders;
      if(orders.length >0){
        this.ordersAvailable = orders.length;
        this.ordersToDisplay = orders.map((item:OrderDisplay) => {
          console.log(item);
          const supplier = suppliers.find((supplier : Supplier) => supplier.id == item.supplier.id)
          let itemConProveedor = {...item, supplier: "Proveedor dado de baja"}
          if(supplier){
            itemConProveedor = {...item, supplier: supplier.business_name}
          } 
          return itemConProveedor 
        })
      }
    });
  }

  getAvailableProducts(){
    this.ordersService.getProductsAmount().subscribe((response)=>{
      this.productsAvailable = response;
    })
  }
  
  getAvailableSuppliers(){
    this.ordersService.getSuppliersAmount().subscribe((response)=>{
      this.suppliersAvailable = response;
    })
  }

  markCanceled(id:number, numeroOrden:number){
    Swal.fire({
      text: `Está por cancelar la orden Nº ${numeroOrden}. ¿Desea continuar?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancelar orden",
      cancelButtonText: "No cancelar la orden"
    }).then((result) => {
      if (result.isConfirmed) {
        const orderToCancel = this.orders.find(item=> item.id == id)
        this.ordersService.markAsCanceled(orderToCancel).subscribe((response)=>{
          console.log(response)
        });
        this.getData();
      }
    });
  }

  setIndex(index : number){
    this.ngForIndex = index;
    this.ordersService.getOrderDetailByOrderId(index+1).subscribe((response)=>{
      console.log(response);
      this.currentOrderDetails = response;
    })
  }
}
