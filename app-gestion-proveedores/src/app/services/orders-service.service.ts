import { Injectable } from '@angular/core';
import { orden } from '../models/orden';
import { ordenesEjemplo } from '../datos/ordenes';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {
  constructor() { }

  orden: orden = 
    {
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

  ordenes : orden[] = ordenesEjemplo;

  getOrders(){
    return this.ordenes
  }

  markAsCanceled(numeroOrden:number){
    this.ordenes = this.ordenes.map(item => item.numeroOrden == numeroOrden ? {...item, estado:'CANCELADO'} : item);
  }

  saveOrder(){
    this.ordenes.push(this.orden)
  }

  clearOrderData(){
    this.orden = 
    {
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
