import { Injectable } from '@angular/core';
import { orden } from '../models/orden';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductsServiceService } from './products-service.service';
import { proveedor } from '../models/proveedores';
import { SupplierServiceService } from './supplier-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {
  constructor(private http:HttpClient, private productService : ProductsServiceService, private suppliersService : SupplierServiceService) { }

  private URL_API = 'http://localhost:3000/orders'
  // private URL_API_SUPPLIERS = 'http://localhost:3000/suppliers'

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
    return this.suppliersService.getSuppliers().pipe(map(suppliers => suppliers.length))
  }

  markAsCanceled(supplierForEdit : any){
    this.orden = {...supplierForEdit, estado: "CANCELADO"}
    return this.http.put(this.URL_API + "/" + this.orden.id, this.orden);
  }
}


