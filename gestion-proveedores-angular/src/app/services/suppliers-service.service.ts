import { Injectable } from '@angular/core';
import { proveedores } from '../data/dataSuppliers'
import { HttpClient } from '@angular/common/http';

const dataProv = proveedores;

@Injectable({
  providedIn: 'root'
})
export class SuppliersServiceService {

  data = dataProv;

  constructor( private http: HttpClient) { }

  public getSuppliers(){
    return this.data;
  }

  public addSupplier(newSupplier:any){
    this.data.push(newSupplier);
    console.log(this.data)
  }

}
