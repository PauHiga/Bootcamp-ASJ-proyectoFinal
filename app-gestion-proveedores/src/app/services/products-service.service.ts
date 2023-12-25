import { Injectable } from '@angular/core';
import { producto } from '../models/producto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:3000/products'

  product: producto = {
    id: '',
    SKUProducto: '',
    categoria: '',
    nombreProducto: '',
    descripcion: '',
    precio: 0,
    URLimage: ''
  }

  products : producto[] = [];

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
      SKUProducto: '',
      categoria: '',
      nombreProducto: '',
      descripcion: '',
      precio: 0,
      URLimage: ''
    }
  }
}
