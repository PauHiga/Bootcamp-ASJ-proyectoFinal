import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { SupplierServiceService } from './supplier-service.service';
import { Product } from '../models/product';
import { ProductDisplay } from '../models/productDisplay';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService implements OnInit {
  constructor(private http:HttpClient, private suppliersService: SupplierServiceService) { }

  ngOnInit(): void {
  }

  URL_API = 'http://localhost:8080/products'

  product: ProductDisplay = {
    id : 0, 
    sku: '',
    name: '',
    description: '',
    price: 0,
    url_image: '',
    supplier: {
        business_name: '',
        id: 0
    },
    category: {
        name: '',
    },
    deleted: false
  }

  getProducts(): Observable<ProductDisplay[]>{
    return this.http.get<ProductDisplay[]>(this.URL_API);
  }

  getAProduct(id:number): Observable<ProductDisplay>{
    return this.http.get<ProductDisplay>(this.URL_API + "/" + id);
  }

  saveProduct() : Observable<any>{   
    const productToSave : Product = {
      id : this.product.id, 
      sku: this.product.sku,
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      url_image: this.product.url_image,
      deleted: false,
      supplier_id: this.product.supplier.id,
      category: this.product.category.name
    }
    console.log(productToSave);
    return this.http.post(this.URL_API, productToSave);
  }

  setProductForEdit(productForEdit : any){
    this.product = productForEdit;
  }

  editProduct(id: string){
    const productToEdit : Product = {
      id : this.product.id, 
      sku: this.product.sku,
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      url_image: this.product.url_image,
      deleted: false,
      supplier_id: this.product.supplier.id,
      category: this.product.category.name
    }
    return this.http.put(this.URL_API + "/" + id, productToEdit);
  }

  deleteProduct(id:number){
    return this.http.put(this.URL_API + "/" + id, {deleted: true})
  }

  activateProduct(id:number){
    return this.http.put(this.URL_API + "/" + id, {deleted: false})
  }

  clearProductData(){
    this.product = {
      id : 0, 
      sku: '',
      name: '',
      description: '',
      price: 0,
      url_image: '',
      supplier: {
          business_name: '',
          id: 0
      },
      category: {
          name: '',
      },
      deleted: false
    }
  }

  getSuppliersList(): Observable<any> {
    return this.suppliersService.getSuppliers();
    }  

}