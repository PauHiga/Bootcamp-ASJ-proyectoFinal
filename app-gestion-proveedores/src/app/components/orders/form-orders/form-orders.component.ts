import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersFormServiceService } from '../../../services/orders-form-service.service';
import { concatMap, forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { ProductDisplay } from '../../../models/productDisplay';
import { Supplier } from '../../../models/supplier';
import { OrderCreate } from '../../../models/orderCreate';
import { OrderDetailCreate } from '../../../models/OrderDetailCreate';
import { OrderDetailDisplay } from '../../../models/OrderDetailDisplay';
import { OrderDisplay } from '../../../models/orderDisplay';
import { compileDeclareFactoryFunction } from '@angular/compiler';


@Component({
  selector: 'app-form-orders',
  templateUrl: './form-orders.component.html',
  styleUrl: './form-orders.component.css'
})
export class FormOrdersComponent implements OnInit{

  constructor(public orderFormService: OrdersFormServiceService, private router:Router, private modalService: NgbModal){}

  order : OrderCreate = 
    {
      id: 0,
      order_number: 0,
      issue_date: '',
      delivery_date: '',
      details: '',
      total: 0,
      supplier_id: 0,
      status: '',
      deleted: false
    }

  orderDetails : OrderDetailCreate[] = []

  suppliers : Supplier[] = []
  products : ProductDisplay[] = []
  orders : OrderDisplay[] = []
  
  selectedSupplier : string = ""
  selectedSupplierImageUrl : string | undefined = ""


  productsToDisplay : ProductDisplay[] = []

  orderDetailProductsSelected : OrderDetailDisplay[] = []  

  idProveedorArray : number[] = []

  totalMayorACeroValido : boolean = true;
  fechaEmisionValida : boolean = true;
  fechaEntregaValida : boolean = true;

  search : string = "";

  ngOnInit(): void {
    this.getData();
    this.clearData();
    this.setCurrentDateOnInputs();
  }

  getData() {
    forkJoin([
      this.orderFormService.getOrders(),
      this.orderFormService.getProducts(),
      this.orderFormService.getSuppliers()
    ]).subscribe(([orders, products, suppliers]) => {
      this.orders = orders;
      this.products = products;
      this.suppliers = suppliers;
      this.getSuppliersWithProducts();
      this.setOrderNumber();
    });
  }
  
  setOrderNumber(){
    if (this.orders.length === 0) {
      this.order.order_number = 1
    }
    else{
      const currentLastOrder = this.orders.reduce((maxOrder, currentOrder) => {
        return currentOrder.order_number > maxOrder ? currentOrder.order_number : maxOrder;
      }, this.orders[0].order_number);
      this.order.order_number = currentLastOrder + 1;
    }
    console.log("order number: " + this.order.order_number);
  }

  getSuppliersWithProducts(){
    this.idProveedorArray = this.products.map(item=> item.supplier.id)
    this.suppliers = this.suppliers.filter(item => this.idProveedorArray.includes(item.id) && item.deleted==false)
  }

  onSelect(event : Event): any
  {
    this.orderDetailProductsSelected = [];
    this.order.total = 0;
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.order.supplier_id = Number(selectedValue);
    this.productsToDisplay = this.products.filter(item => item.supplier.id == Number(selectedValue))
    const selectedSupplier = this.suppliers.find(item=> item.id == Number(selectedValue))
    this.selectedSupplierImageUrl = selectedSupplier?.url_logo
  }

  addProductToOrder(event : Event, data: ProductDisplay){
    const cantidad = (event.target as HTMLSelectElement).value;
    const newProductForOrden : OrderDetailDisplay = {
      // id: data.id,
      product: data,
      unit_price: data.price,
      quantity: Number(cantidad)
    }
    const noRepeatProductsFilter = this.orderDetailProductsSelected.filter(item => item.product.id != data.id)
    if(Number(cantidad) > 0){
      noRepeatProductsFilter.push(newProductForOrden)
    }
    this.orderDetailProductsSelected = noRepeatProductsFilter
    this.getTotal()
    this.validateTotal()
  }

  getTotal(){
    const total = this.orderDetailProductsSelected.reduce((accumulator, currentObject)=> accumulator + currentObject.unit_price * currentObject.quantity, 0)
    this.order.total = Number(total.toFixed(2))
  }

  orderDetailProductsSelectedToOrdenProductos(){
    this.orderDetails = this.orderDetailProductsSelected.map(item => {
      const orderDetail : OrderDetailCreate = {product_id:item.product.id, unit_price:item.unit_price, quantity: item.quantity, order_id:0}
      return orderDetail
    })
  }

  onClickForm(formularioProveedores:NgForm){
    this.orderDetailProductsSelectedToOrdenProductos()
    let productsString = ""
    for(let orderDetailProduct of this.orderDetailProductsSelected){
      productsString = productsString + '<table class="w-100 my-4"><tr class="mb-0 mt-4"><td colspan="2">' + orderDetailProduct.product.name + ' </td><tr class="mt-0"><td>Unit price: ' + orderDetailProduct.unit_price + " </td><td> Quantity: " + orderDetailProduct.quantity + "</td><tr></table>"
    }
    if(formularioProveedores.valid && this.validacionFormulario()){
      Swal.fire({
        title: "You are about to generate a new order. Do you want to continue?",
        icon: "info",
        html: `
        <div class="w-80">
          <h5>Total: $${this.order.total}</h5>
          
            ${productsString}
          
        </div>
      `,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Generate new order",
        cancelButtonText: "Cancel"
        
      }).then((result) => {
        if (result.isConfirmed) {
          this.confirmarNuevaOrden();
        }
      });
    } else {
      Swal.fire({
        text: "There are incomplete or incorrect fields. Please review the form.",
        icon: "warning"
      });  
    }
  }


  validacionFormulario(){
    this.totalMayorACeroValido = this.order.total>0
    this.fechaEmisionValida =  this.validateStringDatesOnlyForward(this.order.issue_date, this.getDate(0))
    this.fechaEntregaValida =  this.validateStringDatesOnlyForward(this.order.delivery_date, this.order.issue_date)
    return this.totalMayorACeroValido && this.fechaEmisionValida && this.fechaEntregaValida
  }

  validateTotal(){
    this.totalMayorACeroValido = this.order.total>0
  }

  validateDateFechaEmision(){
    this.fechaEmisionValida =  this.validateStringDatesOnlyForward(this.order.issue_date, this.getDate(0))
  }

  validateDateFechaEntrega(){
    this.fechaEntregaValida =  this.validateStringDatesOnlyForward(this.order.delivery_date, this.order.issue_date)
  }

  validateStringDatesOnlyForward(date :string , currentDate : string){
    const dateDate = new Date(date);
    const currentDateDate = new Date(currentDate);
    return dateDate >= currentDateDate
  }

  confirmarNuevaOrden(){
    this.orderFormService.saveOrder(this.order, this.orderDetails).subscribe((response)=>{
      this.clearData()
      this.router.navigate(["orders"])
      Swal.fire("Order successfully placed");
    },
    (error)=>{
      Swal.fire({
        title: "Order not created",
        text: "There was an error! The order could not be created",
        icon: "error"
      })
    }
    )
  }

  clearData(){
    this.order = 
    {
      id: 0,
      order_number: 0,
      issue_date: '',
      delivery_date: '',
      details: '',
      total: 0,
      supplier_id: 0,
      status: '',
      deleted: false
    }
  }

  getDate(extraDays : number): string {
    let date : Date = new Date();

    if(extraDays != 0){
      date.setDate(date.getDate() + extraDays);
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // months are zero-based
    const day = date.getDate();

    // Ensure two digits for month and day
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  setCurrentDateOnInputs() : void{
    this.order.issue_date = this.getDate(0);
    this.order.delivery_date = this.getDate(1);
  }

  cancel(objetivo: string){
    Swal.fire({
      text: "Are you sure you want to exit? The modifications won't be saved",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Leave this page",
      cancelButtonText: "Stay in this page"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([objetivo])
      }
    });
  }

}
