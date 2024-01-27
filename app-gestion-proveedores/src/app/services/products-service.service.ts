import { Injectable, OnInit } from '@angular/core';
import { producto } from '../models/producto';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { SupplierServiceService } from './supplier-service.service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService implements OnInit {
  constructor(private http:HttpClient, private suppliersService: SupplierServiceService) { }

  ngOnInit(): void {
  }

  URL_API = 'http://localhost:8080/products'

  product: producto = {
    id: '',
    idProveedor: '',
    SKUProducto: '',
    categoria: '',
    nombreProducto: '',
    descripcion: '',
    precio: 0,
    URLimage: ''
  }

  getProducts(): Observable<any>{
    return this.http.get(this.URL_API);
  }

  getAProduct(id:string): Observable<any>{
    return this.http.get(this.URL_API + "/" + id);
  }

  saveProduct() : Observable<any>{   
    console.log(this.product); 
    const productToSave : Product = {
      SKU: this.product.SKUProducto,
      name: this.product.nombreProducto,
      description: this.product.descripcion,
      price: this.product.precio,
      url_image: this.product.URLimage,
      supplier_id: Number(this.product.idProveedor),
      category: this.product.categoria, 
      deleted: false
    }
    return this.http.post(this.URL_API, this.product);
  }

  setProductForEdit(productForEdit : any){
    this.product = productForEdit;
  }

  editProduct(id: string){
    return this.http.put(this.URL_API + "/" + id, this.product);
  }

  deleteProduct(id:string){
    return this.http.delete(this.URL_API + "/" + id)
  }

  clearProductData(){
    this.product = {
      id: '',
      idProveedor: '',
      SKUProducto: '',
      categoria: '',
      nombreProducto: '',
      descripcion: '',
      precio: 0,
      URLimage: ''
    }
  }

  getSuppliersList(): Observable<any> {
    return this.suppliersService.getSuppliers();
    }  

}