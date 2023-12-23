import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsServiceService } from '../../../services/products-service.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})
export class FormProductsComponent implements OnInit{

  constructor(public productsService: ProductsServiceService, private route:ActivatedRoute, private router:Router){}

  parametroURL = this.route.snapshot.params['edit'] || false;
  tituloFormulario = "Agregar Producto"

  ngOnInit(): void {
    if(this.parametroURL) {
      this.tituloFormulario = "Editar Proveedor";
      this.productsService.setProductForEdit(this.parametroURL)}
    else{
      this.productsService.clearProductData()
    }
  }

  onClickForm(formularioProveedores:NgForm){
    console.log(this.parametroURL)
    if(this.parametroURL){
      this.productsService.editProduct()
    } else {
      this.productsService.saveSupplier()
    }
    this.productsService.clearProductData()
    this.router.navigate(["productos"])
  }

}
