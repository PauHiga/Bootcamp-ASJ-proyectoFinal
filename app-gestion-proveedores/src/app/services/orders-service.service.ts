import { Injectable } from '@angular/core';
import { orden } from '../models/orden';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {
  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:3000/orders'

  orden: orden = 
    {
      id: "",
      numeroOrden: 0,
      fechaEmision: '',
      fechaEntrega: '',
      informacionRecepcion: '',
      proveedor: '',
      productos: [
        { codigoProducto: '', cantidad: 0 },
        { codigoProducto: '', cantidad: 0 }
      ],
      total: 0,
      estado: 'NO CANCELADO'
    }

  ordenes : orden[] = [];

  getOrders() : Observable<any>{
    return this.http.get(this.URL_API);
  }

  markAsCanceled(supplierForEdit : any){
    console.log(supplierForEdit)
    console.log("toCancel")
    this.orden = {...supplierForEdit, estado: "CANCELADO"}
    console.log(this.orden)
    console.log(this.URL_API + "/" + this.orden.id)
    return this.http.put(this.URL_API + "/" + this.orden.id, this.orden);
  }

  saveOrder() : Observable<any>{    
    return this.http.post(this.URL_API, this.orden);
  }

  clearOrderData(){
    this.orden = 
    {
      id: "",
      numeroOrden: 0,
      fechaEmision: '',
      fechaEntrega: '',
      informacionRecepcion: '',
      proveedor: '',
      productos: [
        { codigoProducto: '', cantidad: 0 },
        { codigoProducto: '', cantidad: 0 }
      ],
      total: 0,
      estado: 'NO CANCELADO'
    }
  }
}
