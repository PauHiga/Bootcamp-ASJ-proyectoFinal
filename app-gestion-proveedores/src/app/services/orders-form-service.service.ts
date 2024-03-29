import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, concatMap, switchMap } from 'rxjs';
import { OrderCreate } from '../models/orderCreate';
import { OrderDetailCreate } from '../models/OrderDetailCreate';
import { OrderDisplay } from '../models/orderDisplay';

@Injectable({
  providedIn: 'root'
})
export class OrdersFormServiceService {
  constructor(private http:HttpClient) { }

  private URL_API_PRODUCTS = 'http://localhost:8080/products'
  private URL_API_SUPPLIERS = 'http://localhost:8080/suppliers'
  private URL_API_ORDERS = 'http://localhost:8080/orders'
  private URL_API_ORDERS_DETAILS = 'http://localhost:8080/order-details/batch'
  private URL_API_ORDERS_STATUS = 'http://localhost:8080/status'

  getProducts() : Observable<any>{
    return this.http.get(this.URL_API_PRODUCTS);
  }

  getSuppliers() : Observable<any>{
    return this.http.get(this.URL_API_SUPPLIERS);
  }

  getOrders() : Observable<any>{
    return this.http.get(this.URL_API_ORDERS);
  }

  getStatus() : Observable<any>{
    return this.http.get(this.URL_API_ORDERS_STATUS);
  }

  saveDetails(orderDetails : OrderDetailCreate[]) : Observable<any>{  
      return this.http.post(this.URL_API_ORDERS_DETAILS, orderDetails)
  }

  saveOrder(newOrder : OrderCreate, orderDetails : OrderDetailCreate[]) : Observable<any>{
    return this.http.post<OrderDisplay>(this.URL_API_ORDERS, {...newOrder, orderDetails: orderDetails})
  }

}
