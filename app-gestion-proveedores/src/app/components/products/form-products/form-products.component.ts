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

  product = {};

  ngOnInit(): void {
    if(this.parametroURL) {
      this.tituloFormulario = "Editar Producto";
      this.getAProduct(this.parametroURL)
    }
    else{
      this.productsService.clearProductData()
    }
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
    if(this.parametroURL){
      this.productsService.editProduct(this.parametroURL).subscribe((response)=> console.log(response))
    } else {
      this.productsService.saveProduct().subscribe((response)=> console.log(response))
    }
    this.productsService.clearProductData()
    this.router.navigate(["productos"])
  }

}
