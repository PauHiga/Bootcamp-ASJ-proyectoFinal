import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsServiceService } from '../../../services/products-service.service';
import { proveedor } from '../../../models/proveedores';

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

  categorias : string[] = [ "Electrónicos", "Deportes", "Juguetes", "ArtOficina", "Ropa", "Hogar"]

  ngOnInit(): void {
    this.getProveedores();
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
    if(formularioProveedores.valid){
      if(this.parametroURL){
        this.productsService.editProduct(this.parametroURL).subscribe((response)=> console.log(response))
      } else {
        this.productsService.saveProduct().subscribe((response)=> console.log(response))
      }
      this.productsService.clearProductData()
      this.router.navigate(["productos"])
    } else {
      alert("Hay campos incompletos o erróneos. Por favor, revise el formulario")
    }
  }

}
