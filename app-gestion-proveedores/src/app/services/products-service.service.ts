import { Injectable } from '@angular/core';
import { producto } from '../models/producto';
import { productosEjemplo } from '../datos/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  constructor() { }

  product: producto =     {
    idProveedor: 0,
    SKUProducto: '',
    categoria: '',
    nombreProducto: '',
    descripcion: '',
    precio: 0,
    URLimage: ''
  }

  products : producto[] = productosEjemplo;

  getProducts(){
    return this.products
  }

  getSuppliersList(){

  }

  setProductForEdit(SKUProducto: string){
    const selectedSupplier = this.products.find(item => item.SKUProducto == SKUProducto)
    if(selectedSupplier){
      this.product = selectedSupplier;
    }
  }

  editProduct(){
    this.products = this.products.map(item => item.SKUProducto == this.product.SKUProducto ? this.product : item);
  }

  deleteProduct(SKUProducto: string){
    this.products = this.products.filter(item => item.SKUProducto != SKUProducto);
  }

  saveSupplier(){
    this.products.push(this.product)
  }

  clearProductData(){
    this.product = {
      idProveedor: 0,
      SKUProducto: '',
      categoria: '',
      nombreProducto: '',
      descripcion: '',
      precio: 0,
      URLimage: ''
    }
  }
}
