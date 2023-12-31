import { Injectable, OnInit } from '@angular/core';
import { producto } from '../models/producto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierServiceService } from './supplier-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService implements OnInit {
  constructor(private http:HttpClient, private suppliersService: SupplierServiceService) { }

  ngOnInit(): void {
  }

  URL_API = 'http://localhost:3000/products'
  URL_API_S = 'http://localhost:3000/suppliers'

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

  proveedores : any[] = [];

  getProducts(): Observable<any>{
    return this.http.get(this.URL_API);
  }

  getAProduct(id:string): Observable<any>{
    return this.http.get(this.URL_API + "/" + id);
  }

  saveProduct() : Observable<any>{    
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
    return this.http.get(this.URL_API_S)
    }  
  
}