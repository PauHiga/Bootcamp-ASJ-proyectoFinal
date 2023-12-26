import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersServiceService } from '../../../services/orders-service.service';
import { orden } from '../../../models/orden';
import { OrdersFormServiceService } from '../../../services/orders-form-service.service';
import { producto } from '../../../models/producto';
import { proveedor } from '../../../models/proveedores';
import { productoCantidad } from '../../../models/productoCantidad';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-form-orders',
  templateUrl: './form-orders.component.html',
  styleUrl: './form-orders.component.css'
})
export class FormOrdersComponent implements OnInit{

  constructor(public orderFormService: OrdersFormServiceService, private router:Router){}

  orden : orden = 
    {
      id: "0",
      numeroOrden: 0,
      fechaEmision: '',
      fechaEntrega: '',
      informacionRecepcion: '',
      proveedor: '',
      productos: [],
      total: 0,
      estado: 'NO CANCELADO'
    }

    suppliers : proveedor[] = []
    products : producto[] = []
    orders : orden[] = []
    
    productsToDisplay : producto[] = []

    productosInProcess : any[] = []  

    idProveedorArray : string[] = []

    mensajeTotalMayorACero: string = "";

  ngOnInit(): void {
    this.getData();
    this.clearData();
    
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
      this.orden.numeroOrden = 1
    }
    else{
      const currentLastOrder = this.orders.reduce((maxOrder, currentOrder) => {
        return currentOrder.numeroOrden > maxOrder ? currentOrder.numeroOrden : maxOrder;
      }, this.orders[0].numeroOrden);
      this.orden.numeroOrden = currentLastOrder + 1;
    }
  }

  getSuppliersWithProducts(){
    this.idProveedorArray = this.products.map(item=> item.idProveedor)
    this.suppliers = this.suppliers.filter(item => this.idProveedorArray.includes(item.id))
  }

  onSelect(event : Event): any
  {
    this.productosInProcess = [];
    this.orden.total = 0;
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.productsToDisplay = this.products.filter(item => item.idProveedor == selectedValue)
  }

  addProductToOrder(event : Event, data:any){
    const cantidad = (event.target as HTMLSelectElement).value;
    const newProductForOrden : any = {
      id: data.id,
      nombreProducto: data.nombreProducto,
      precio: data.precio,
      cantidad: Number(cantidad)
    }
    const filteredOrdenProducts = this.productosInProcess.filter(item => item.id != data.id)
    if(Number(cantidad) > 0){
      filteredOrdenProducts.push(newProductForOrden)
    }
    this.productosInProcess = filteredOrdenProducts
    this.getTotal()
  }

  getTotal(){
    const total = this.productosInProcess.reduce((accumulator, currentObject)=> accumulator + currentObject.precio * currentObject.cantidad, 0)
    this.orden.total = total.toFixed(2)
  }

  productsInProcessToOrdenProductos(){
    this.orden.productos = this.productosInProcess.map(item => {
      const producto = {id:item.id, nombreProducto:item.nombreProducto, cantidad: item.cantidad}
      return producto
    })
  }

  onClickForm(formularioProveedores:NgForm){
    this.productsInProcessToOrdenProductos()
    this.totalMayorACero();
    if(formularioProveedores.valid && this.validacionFormulario()){
      alert('crear orden')
      this.orderFormService.saveOrder(this.orden).subscribe((response)=>{
        console.log(response);
      })
      this.clearData()
      this.router.navigate(["ordenes"])
      alert("Orden creada exitosamente")
    } else {
      alert("Hay campos incompletos o erróneos. Por favor, revise el formulario")
    }
  }


  validacionFormulario(){

    return (this.orden.total>0)
  }

  clearData(){
    this.orden = 
    {
      id: "",
      numeroOrden: 0,
      fechaEmision: '',
      fechaEntrega: '',
      informacionRecepcion: '',
      proveedor: '',
      productos: [],
      total: 0,
      estado: 'NO CANCELADO'
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

  totalMayorACero(): void {
    if(this.orden.total<=0){
      this.mensajeTotalMayorACero = "Seleccione uno o más productos"
    } else {
      this.mensajeTotalMayorACero = ""
    }
  }

  cancelar(){
    const confirmar = confirm("¿Seguro desea salir? Los datos se perderán")
    if(confirmar){
      this.router.navigate(["ordenes"])
    }
  }

  cancelarHome(){
    const confirmar = confirm("¿Seguro desea salir? Los datos se perderán")
    if(confirmar){
      this.router.navigate([""])
    }
  }
}
