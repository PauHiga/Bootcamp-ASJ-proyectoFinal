import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { orden } from '../../../models/orden';
import { OrdersFormServiceService } from '../../../services/orders-form-service.service';
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { ProductDisplay } from '../../../models/productDisplay';
import { Supplier } from '../../../models/supplier';
import { OrderCreate } from '../../../models/orderCreate';
import { OrderDetailCreate } from '../../../models/OrderDetailCreate';
import { OrderDetailDisplay } from '../../../models/OrderDetailDisplay';
import { OrderDisplay } from '../../../models/orderDisplay';


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
  
  selectedSupplier = {}

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
    this.productsToDisplay = this.products.filter(item => item.id == Number(selectedValue))
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
      productsString = productsString + "<li>" + orderDetailProduct.product.name +"</li>"
    }
    if(formularioProveedores.valid && this.validacionFormulario()){
      Swal.fire({
        title: "Está a punto de generar una nueva orden. ¿Desea continuar?",
        icon: "info",
        html: `
        <p>Total: ${this.order.total}</p>
        <ul>
          ${productsString}
        </ul>
      `,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Generar orden",
        cancelButtonText: "Cancelar"
        
      }).then((result) => {
        if (result.isConfirmed) {
          this.confirmarNuevaOrden();
        }
      });
    } else {
      Swal.fire({
        text: "Hay campos incompletos o erróneos. Por favor, revise el formulario",
        icon: "warning"
      });  
    }
  }


  validacionFormulario(){
    this.totalMayorACeroValido = this.order.total>0
    this.fechaEmisionValida =  this.validateStringDatesOnlyForward(this.order.issue_date, this.getCurrentDate())
    this.fechaEntregaValida =  this.validateStringDatesOnlyForward(this.order.delivery_date, this.order.issue_date)
    return this.totalMayorACeroValido && this.fechaEmisionValida && this.fechaEntregaValida
  }

  validateTotal(){
    this.totalMayorACeroValido = this.order.total>0
  }

  validateDateFechaEmision(){
    this.fechaEmisionValida =  this.validateStringDatesOnlyForward(this.order.issue_date, this.getCurrentDate())
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
    this.orderFormService.saveOrder(this.order).subscribe((response)=>{
      console.log(response);
    })
    this.clearData()
    this.router.navigate(["ordenes"])
    Swal.fire("Orden creada exitosamente");
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

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // months are zero-based
    const day = today.getDate();

    // Ensure two digits for month and day
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  setCurrentDateOnInputs() : void{
    this.order.issue_date = this.getCurrentDate();
  }

  cancelar(objetivo: string){
    Swal.fire({
      text: "¿Seguro desea salir? Los datos se perderán",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([objetivo])
      }
    });
  }

}
