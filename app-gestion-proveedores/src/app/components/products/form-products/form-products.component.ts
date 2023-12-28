import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsServiceService } from '../../../services/products-service.service';
import { proveedor } from '../../../models/proveedores';
import { producto } from '../../../models/producto';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})
export class FormProductsComponent implements OnInit{

  constructor(public productsService: ProductsServiceService, private route:ActivatedRoute, private router:Router){}

  parametroURL = this.route.snapshot.params['edit'] || false;
  tituloFormulario = "Agregar Producto"

  product = {};

  suppliersList : proveedor[] = [];
  productos : producto[] = [];

  skuRepetido = false;

  categorias : string[] = [ "Electrónicos", "Deportes", "Juguetes", "ArtOficina", "Ropa", "Hogar"]

  ngOnInit(): void {
    this.getProveedores();
    this.getProductos();
    if(this.parametroURL) {
      this.tituloFormulario = "Editar Producto";
      this.getAProduct(this.parametroURL)
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
      alert("Los datos del producto fueron cargados exitosamente")

    } else {
      alert("Hay campos incompletos o erróneos. Por favor, revise el formulario")
    }
  }

  skuIsUnique(event : Event){
    const currentSku = (event.target as HTMLSelectElement).value;
    const productosSKUs = this.productos.map(item=> item.SKUProducto)
    this.skuRepetido = productosSKUs.includes(currentSku);
  }

  cancelar(){
    const confirmar = confirm("¿Seguro desea salir? Los datos se perderán")
    if(confirmar){
      this.router.navigate(["productos"])
    }
  }
  cancelarHome(){
    const confirmar = confirm("¿Seguro desea salir? Los datos se perderán")
    if(confirmar){
      this.router.navigate([""])
    }
  }
}
