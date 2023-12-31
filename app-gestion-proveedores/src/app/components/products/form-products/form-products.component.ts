import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsServiceService } from '../../../services/products-service.service';
import { proveedor } from '../../../models/proveedores';
import { producto } from '../../../models/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})
export class FormProductsComponent implements OnInit{

  constructor(public productsService: ProductsServiceService, private route:ActivatedRoute, private router:Router){}

  parametroURL : string = ''
  tituloFormulario : string = "Agregar Producto"

  product = {};

  suppliersList : proveedor[] = [];
  productos : producto[] = [];

  disabledInEdit : boolean = false;

  skuRepetido = false;

  categorias : string[] = [ "Art. Oficina", "Catering", "Electrónicos", "Papelería", "Reparaciones", "Servicios"]

  ngOnInit(): void {
    this.parametroURL = this.route.snapshot.params['edit'];
    this.getProveedores();
    this.getProductos();
    if(this.parametroURL != '') {
      this.setEditForm();
    }
    else{
      this.productsService.clearProductData()
    }
  }

  getProveedores(){
    this.productsService.getSuppliersList().subscribe((response)=>{
      this.suppliersList = response;
      this.suppliersList = this.suppliersList.filter(item => item.deleted == false)
    })
  }

  getProductos(){
    this.productsService.getProducts().subscribe((response)=>{
      this.productos = response;
    })
  }

  setEditForm(){
    this.tituloFormulario = "Editar Producto";
    this.getAProduct(this.parametroURL);
    this.disabledInEdit = true;

  }

  getAProduct(id : string){
    this.productsService.getAProduct(id).subscribe(
      (response) =>{
        console.log(response)
        this.productsService.setProductForEdit(response)
      }
    )
  }

  onClickForm(formularioProveedores:NgForm){
    if(formularioProveedores.valid && !this.skuRepetido){
      if(this.parametroURL){
        this.productsService.editProduct(this.parametroURL).subscribe((response)=> console.log(response))
      } else {
        this.productsService.saveProduct().subscribe((response)=> console.log(response))
      }
      this.productsService.clearProductData()
      this.router.navigate(["productos"])
      Swal.fire("Los datos del producto fueron cargados exitosamente");
    } else {
      Swal.fire({
        text: "Hay campos incompletos o erróneos. Por favor, revise el formulario",
        icon: "warning"
      });    }
  }

  skuIsUnique(event : Event){
    const currentSku = (event.target as HTMLSelectElement).value;
    const productosSKUs = this.productos.map(item=> item.SKUProducto)
    this.skuRepetido = productosSKUs.includes(currentSku);
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
