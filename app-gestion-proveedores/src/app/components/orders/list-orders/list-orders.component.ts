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

  ordersActive : number = 0;
  productsActive :  number = 0;
  suppliersActive : number = 0;
  
  ngForIndex = 0
  showDeleted = false
  showDeletedButtonMessage = "Show cancelled orders"

  title : String = "Orders"

  searchByStatus :  string = ""

  search : string = ""
  sortByProperty : string = "sku";
  sortByPropertyActivated : boolean = false;
  sortBySubproperty : string = "";
  sortBySubpropertyActivated : boolean = false;
  sortByDesc : boolean = false;

  setSortByCode(property : string){
    this.sortByPropertyActivated = true;
    this.sortByProperty = property;
    this.sortByDesc = !this.sortByDesc;
  }

  setSortBySubpropertyCode(property : string, subproperty : string){
    this.sortBySubpropertyActivated = true;
    this.sortByProperty = property;
    this.sortBySubproperty = subproperty;
    this.sortByDesc = !this.sortByDesc;
  }

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
    this.getActiveOrders();
    this.getActiveProducts();
    this.getActiveSuppliers();
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

  getActiveOrders(){
    this.ordersService.getOrdersCount(false).subscribe((response)=>{
      this.ordersActive = response;
    })
  }

  getActiveProducts(){
    this.ordersService.getProductsCount(false).subscribe((response)=>{
      this.productsActive = response;
    })
  }

  getActiveSuppliers(){
    this.ordersService.getSuppliersCount(false).subscribe((response)=>{
      this.suppliersActive = response;
    })
  }

  markCanceled(id?:number, numeroOrden?:number){
    if(id){
      Swal.fire({
        title: `The order ${numeroOrden} will be cancelled.`,
        text:  `This operation cannot be undone ¿Do you wish to continue?`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        confirmButtonText: "Cancel this order",
        cancelButtonText: "Do not cancel this order"
      }).then((result) => {
        if (result.isConfirmed) {
          this.ordersService.markAsCanceled(id).subscribe((response)=>{
            this.getData();
            this.getActiveOrders();
          },
          (error)=>{
            console.log(error);
            Swal.fire({
              title: "Order not eliminated",
              text: "There was an error! The order could not be eliminated",
              icon: "error"
            })
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
            Swal.fire({
              title: "Status changed",
              text: `The status was successfully changed to ${response.status.name}`,
              icon: "info"
            })
            this.getData();
          },
          (error)=>{
            console.log(error);
            Swal.fire({
              title: "Status not changed",
              text: "There was an error! The status could not be changed",
              icon: "error"
            })
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
