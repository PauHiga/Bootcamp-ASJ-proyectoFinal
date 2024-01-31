import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersServiceService } from '../../../services/orders-service.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { OrderDisplay } from '../../../models/orderDisplay';
import { OrderDetailDisplay } from '../../../models/OrderDetailDisplay';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent implements OnInit{

  constructor(public ordersService: OrdersServiceService, private route:ActivatedRoute, private router:Router){}

  orders : OrderDisplay[]= [];
  currentOrderDetails : OrderDetailDisplay[]= [];
  currentOrder : OrderDisplay | null = null;
  statusList : {id: number, name: string}[] = []

  ordersAvailable = 0;
  productsAvailable = 0;
  suppliersAvailable = 0;
  
  ngForIndex = 0
  showDeleted = false
  showDeletedButtonMessage = "Show cancelled orders"

  title : String = "Orders"

  searchByStatus :  string = ""

  toggleShowDeleted(){
    this.showDeleted = !this.showDeleted
    if (this.showDeleted){
      this.showDeletedButtonMessage = "Show orders"
      this.title = "Cancelled Orders"
    } else{
      this.showDeletedButtonMessage = "Show cancelled orders"
      this.title = "Orders"
    }
  }
  
  ngOnInit(): void {
    this.getData();
    this.getAvailableProducts();
    this.getAvailableSuppliers();
    this.getStatus();
  }

  getData() {
    forkJoin([
      this.ordersService.getOrders(),
      this.ordersService.getSuppliers()
    ]).subscribe(([orders, suppliers]) => {
      this.orders = orders;
    });

    forkJoin([
      this.ordersService.getOrders(),
      this.ordersService.getSuppliers()
    ]).subscribe(([orders, suppliers]) => {
      this.orders = orders;
    });
  }

  getStatus(){
    this.ordersService.getStatus().subscribe((response)=>{
      this.statusList = response
    })
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

  markCanceled(id?:number, numeroOrden?:number){
    if(id){
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
          // const orderToCancel = this.orders.find(item=> item.id == id)
          this.ordersService.markAsCanceled(id).subscribe((response)=>{
            this.getData();
          });
        }
      });
    }
  }

  setOrderId(order : OrderDisplay){
    this.currentOrder = order;
    this.ordersService.getOrderDetailByOrderId(order.id).subscribe((response)=>{
      console.log(response);
      this.currentOrderDetails = response;
    })
  }

  changeStatus(orderId : number, status : string){
  const arrayToJson: { [key: string]: string } = this.statusList.reduce((acc, currentValue) => {
    acc[currentValue.name] = currentValue.name;
    return acc;
  }, {} as { [key: string]: string });

    Swal.fire({
      text: `Change order status`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Change status",
      cancelButtonText: "Do not change status",
      input: "select",
      inputOptions: arrayToJson,
      inputPlaceholder: "Select the new state",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        console.log(status);
        if(result.value != '' && result.value != status){
          this.ordersService.saveNewStatus(orderId, result.value).subscribe((response)=>{
            console.log(response);
            this.getData();
          });
        }
      }
    });
  }

//Filter by status
  onSelect(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.searchByStatus = selectedValue;
  }
}
