import { Injectable } from '@angular/core';
import { proveedores } from '../data/dataSuppliers'
import { HttpClient } from '@angular/common/http';

const dataProv = proveedores;

@Injectable({
  providedIn: 'root'
})
export class SuppliersServiceService {

  dataProveedores = dataProv;

  constructor( private http: HttpClient) { }

  public getSuppliers(){
    return this.dataProveedores;
  }

  public addSupplier(newSupplier:any){
    this.dataProveedores.push(newSupplier);
    console.log(this.dataProveedores)
  }
}
