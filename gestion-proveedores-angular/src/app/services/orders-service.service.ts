import { Injectable } from '@angular/core';
import { ordenesCompra } from '../data/dataOrdenesCompra';
import { HttpClient } from '@angular/common/http';

const data = ordenesCompra

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {

  orders = data;

  constructor( private http: HttpClient) { }

  public getOrders(){
    return this.orders;
  }

  public addOrder(newOrder:any){
    this.orders.push(newOrder);
  }
}
