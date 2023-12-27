import { Injectable } from '@angular/core';
import { proveedor } from '../models/proveedores';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpperCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:3000/suppliers'

  suppliers : proveedor[] = [];

  getSuppliers() : Observable<any>{
    return this.http.get(this.URL_API);
  }

  getASupplier(id:string) : Observable<proveedor>{
    return this.http.get<proveedor>(this.URL_API + "/" + id);
  }

  saveSupplier(supplierToSave : proveedor) : Observable<proveedor>{    
    return this.http.post<proveedor>(this.URL_API, supplierToSave);
  }

  editSupplier(supplierToEdit : proveedor, id: string){
    return this.http.put(this.URL_API + "/" + id, supplierToEdit);
  }

  deleteSupplier(id:string){
    return this.http.delete(this.URL_API + "/" + id)
  }
}
