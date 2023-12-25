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

  supplier: proveedor = {
    id: '',
    codigo: '',
    razonSocial: '',
    rubro: '',
    URLlogo: '',
    CUIT: '',
    condicionIva: '',
    email: '',
    telefono: '',
    web: '',
    direccion : {
      calle: '',
      altura: '',
      CP: '',
      pais: '',
      provincia: '',
      localidad: '',
    },
    contacto: {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      rol: ''
    }
  }

  suppliers : proveedor[] = [];

  getSuppliers() : Observable<any>{
    return this.http.get(this.URL_API);
  }

  getASupplier(id:string){
    return this.http.get(this.URL_API + "/" + id);
  }

  saveSupplier() : Observable<any>{    
    return this.http.post(this.URL_API, this.supplier);
  }

  setSupplierForEdit(supplierForEdit : any){
    this.supplier = supplierForEdit;
  }

  editSupplier(id: string){
    return this.http.put(this.URL_API + "/" + id, this.supplier);
  }

  deleteSupplier(id:string){
    console.log(this.URL_API + "/" + id)
    return this.http.delete(this.URL_API + "/" + id)
  }

  clearSupplierData(){
    this.supplier = {
      id: '',
      codigo: '',
      razonSocial: '',
      rubro: '',
      URLlogo: '',
      CUIT: '',
      condicionIva: '',
      email: '',
      telefono: '',
      web: '',
      direccion : {
        calle: '',
        altura: '',
        CP: '',
        pais: '',
        provincia: '',
        localidad: '',
      },
      contacto: {
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        rol: ''
      }
    }
  }


}
