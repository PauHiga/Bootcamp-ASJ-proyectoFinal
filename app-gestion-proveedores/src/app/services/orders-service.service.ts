import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductsServiceService } from './products-service.service';
import { SupplierServiceService } from './supplier-service.service';
import { Supplier } from '../models/supplier';
import { ProductDisplay } from '../models/productDisplay';
import { OrderDetailDisplay } from '../models/OrderDetailDisplay';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {
  constructor(private http:HttpClient, private productService : ProductsServiceService, private suppliersService : SupplierServiceService) { }

  private URL_API = 'http://localhost:8080/orders'
  private URL_API_ORDER_DETAILS = 'http://localhost:8080/order-details'
  private URL_API_STATUS = 'http://localhost:8080/status'

  getOrders() : Observable<any>{
    return this.http.get(this.URL_API);
  }

  getSuppliers() : Observable<any>{
    return this.suppliersService.getSuppliers();
  }

  getProductsAmount(): Observable<number>{
    return this.productService.getProducts().pipe(map(products => products.length))
  }

  getStatus() : Observable<any>{
    return this.http.get(this.URL_API_STATUS);
  }

  saveNewStatus(idOrder : number, newStatus : string) : Observable<any>{
    console.log(newStatus);
    return this.http.put(this.URL_API + "/" + idOrder, {status: newStatus});
  }

  getOrderDetailByOrderId(id : number): Observable<OrderDetailDisplay[]>{
    return this.http.get<OrderDetailDisplay[]>(this.URL_API_ORDER_DETAILS + "/order/" + id);
  }

  getSuppliersAmount(): Observable<number>{
    return this.suppliersService.getSuppliers().pipe(map(suppliers => suppliers.filter((supplier : Supplier)=> supplier.deleted == false).length
    ))
  }

  markAsCanceled(id : number){
    return this.http.put(this.URL_API + "/" + id, {deleted: true});
  }
}


