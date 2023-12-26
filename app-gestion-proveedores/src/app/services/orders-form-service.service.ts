import { Injectable } from '@angular/core';
import { orden } from '../models/orden';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersFormServiceService {
  constructor(private http:HttpClient) { }

  private URL_API_PRODUCTS = 'http://localhost:3000/products'
  private URL_API_SUPPLIERS = 'http://localhost:3000/suppliers'
  private URL_API_ORDERS = 'http://localhost:3000/orders'

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

  saveOrder(orden : orden) : Observable<any>{   
    this.orden =  orden
    console.log(this.orden)
    return this.http.post(this.URL_API_ORDERS, this.orden);
  }

  orden: orden = 
  {
    id: "",
    numeroOrden: 0,
    fechaEmision: '',
    fechaEntrega: '',
    informacionRecepcion: '',
    proveedor: '',
    productos: [
      { id: '', nombreProducto: '', cantidad: 0 },
      { id: '', nombreProducto: '', cantidad: 0 }
    ],
    total: 0,
    estado: 'NO CANCELADO'
  }
}
