import { Injectable } from '@angular/core';
import { orden } from '../models/orden';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { producto } from '../models/producto';
import { OrderCreate } from '../models/orderCreate';
import { OrderDetailCreate } from '../models/OrderDetailCreate';

@Injectable({
  providedIn: 'root'
})
export class OrdersFormServiceService {
  constructor(private http:HttpClient) { }

  private URL_API_PRODUCTS = 'http://localhost:8080/products'
  private URL_API_SUPPLIERS = 'http://localhost:8080/suppliers'
  private URL_API_ORDERS = 'http://localhost:8080/orders'

  ordenes : orden[] = [];

  getProducts() : Observable<any>{
    return this.http.get(this.URL_API_PRODUCTS);
  }

  getSuppliers() : Observable<any>{
    return this.http.get(this.URL_API_SUPPLIERS);
  }

  getOrders() : Observable<any>{
    return this.http.get(this.URL_API_ORDERS);
  }

  saveDetails(orderDetails : OrderDetailCreate[]) : void{  
    orderDetails.forEach(orderDetail => {
      this.http.post(this.URL_API_ORDERS, order)
    });
  }


  saveOrder(order : OrderCreate) : Observable<any>{  
    return this.http.post(this.URL_API_ORDERS, order);
  }

  // orden: orden = 
  // {
  //   id: "",
  //   numeroOrden: 0,
  //   fechaEmision: '',
  //   fechaEntrega: '',
  //   informacionRecepcion: '',
  //   proveedor: '',
  //   productos: [
  //     { id: '', nombreProducto: '', cantidad: 0 },
  //     { id: '', nombreProducto: '', cantidad: 0 }
  //   ],
  //   total: 0,
  //   estado: 'NO CANCELADO'
  // }
}
