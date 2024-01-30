import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductsServiceService } from './products-service.service';
import { SupplierServiceService } from './supplier-service.service';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {
  constructor(private http:HttpClient, private productService : ProductsServiceService, private suppliersService : SupplierServiceService) { }

  private URL_API = 'http://localhost:8080/orders'

  getOrders() : Observable<any>{
    return this.http.get(this.URL_API);
  }

  getSuppliers() : Observable<any>{
    return this.suppliersService.getSuppliers();
  }

  getProductsAmount(): Observable<number>{
    return this.productService.getProducts().pipe(map(products => products.length))
  }

  getSuppliersAmount(): Observable<number>{
    return this.suppliersService.getSuppliers().pipe(map(suppliers => suppliers.filter((supplier : Supplier)=> supplier.deleted == false).length
    ))
  }

  markAsCanceled(supplierForEdit : any){
    const canceledOrder = {...supplierForEdit, estado: "CANCELADO"}
    return this.http.put(this.URL_API + "/" + canceledOrder.id, canceledOrder);
  }
}


