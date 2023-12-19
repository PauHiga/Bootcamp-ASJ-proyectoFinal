import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../../../services/products-service.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})
export class FormProductsComponent implements OnInit {

  productos: any = [];

  constructor(private router:Router, public ProductsService:ProductsServiceService){}

  ngOnInit(): void {
  }

  id = ""
  SKU = ""
  proveedorId = ""
  categoria = ""
  nombreProducto = ""
  descripcion = ""
  precio = ""

  addProducto(){
    const datosproducto = {
      id: 99,
      SKU: this.SKU,
      proveedorId: this.proveedorId,
      categoria: this.categoria,
      nombreProducto: this.nombreProducto,
      descripcion: this.descripcion,
      precio: this.precio,
    };

    this.ProductsService.addProduct(datosproducto)
    this.router.navigate(['/productos'])
  }

  eraseForm(){
    this.id = ""
    this.SKU = ""
    this.proveedorId = ""
    this.categoria = ""
    this.nombreProducto = ""
    this.descripcion = ""
    this.precio = ""
  }

}
