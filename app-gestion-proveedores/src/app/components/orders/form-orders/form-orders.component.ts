import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { orden } from '../../../models/orden';
import { OrdersFormServiceService } from '../../../services/orders-form-service.service';
import { producto } from '../../../models/producto';
import { proveedor } from '../../../models/proveedoresVIEJO';
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-form-orders',
  templateUrl: './form-orders.component.html',
  styleUrl: './form-orders.component.css'
})
export class FormOrdersComponent implements OnInit{

  constructor(public orderFormService: OrdersFormServiceService, private router:Router, private modalService: NgbModal){}

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
    this.idProveedorArray = this.products.map(item=> item.idProveedor.toString())
    this.suppliers = this.suppliers.filter(item => this.idProveedorArray.includes(item.id.toString()) && item.deleted==false)
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
    this.validateTotal()
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
    let productsString = ""
    for(let product of this.orden.productos){
      productsString = productsString + "<li>" + product.nombreProducto +"</li>"
    }
    if(formularioProveedores.valid && this.validacionFormulario()){
      Swal.fire({
        title: "Está a punto de generar una nueva orden. ¿Desea continuar?",
        icon: "info",
        html: `
        <p>Total: ${this.orden.total}</p>
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
    this.totalMayorACeroValido = this.orden.total>0
    this.fechaEmisionValida =  this.validateStringDatesOnlyForward(this.orden.fechaEmision, this.getCurrentDate())
    this.fechaEntregaValida =  this.validateStringDatesOnlyForward(this.orden.fechaEntrega, this.orden.fechaEmision)
    return this.totalMayorACeroValido && this.fechaEmisionValida && this.fechaEntregaValida
  }

  validateTotal(){
    this.totalMayorACeroValido = this.orden.total>0
  }

  validateDateFechaEmision(){
    this.fechaEmisionValida =  this.validateStringDatesOnlyForward(this.orden.fechaEmision, this.getCurrentDate())
  }

  validateDateFechaEntrega(){
    this.fechaEntregaValida =  this.validateStringDatesOnlyForward(this.orden.fechaEntrega, this.orden.fechaEmision)
  }

  validateStringDatesOnlyForward(date :string , currentDate : string){
    const dateDate = new Date(date);
    const currentDateDate = new Date(currentDate);
    return dateDate >= currentDateDate
  }

  confirmarNuevaOrden(){
    this.orderFormService.saveOrder(this.orden).subscribe((response)=>{
      console.log(response);
    })
    this.clearData()
    this.router.navigate(["ordenes"])
    Swal.fire("Orden creada exitosamente");
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

  setCurrentDateOnInputs() : void{
    this.orden.fechaEmision = this.getCurrentDate();
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
