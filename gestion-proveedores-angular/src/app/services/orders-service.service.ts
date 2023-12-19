import { Injectable } from '@angular/core';
import { ordenesCompra } from '../data/dataOrdenesCompra';
import { HttpClient } from '@angular/common/http';

const data = ordenesCompra

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {

  constructor( private http: HttpClient) { }

  public getOrders(){
    return data;
  }

  public addProduct(newProduct:any){
    data.push(newProduct);
  }
}
