import { Injectable } from '@angular/core';
import { proveedor } from '../models/proveedores';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:3000/suppliers'
  URL_API_SECTOR = 'http://localhost:3000/sectors'

  getSuppliers() : Observable<proveedor[]>{
    return this.http.get<proveedor[]>(this.URL_API);
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

  logicalDeleteSupplier(id: string) : Observable<proveedor> {
    return this.http.get<proveedor>(this.URL_API + "/" + id).pipe(
      map((supplier) => {
        let modifiedSupplier = { ...supplier, deleted: true };
        return modifiedSupplier;
      }),
      switchMap((modifiedSupplier) => this.http.put <proveedor> (this.URL_API + "/" + id, modifiedSupplier))
    );
  }

  getSectors() : Observable<any>{
    return this.http.get<any>(this.URL_API_SECTOR);
  }

  saveSector(sectorToSave : any) : Observable<any>{
    const sector = {
      name: sectorToSave,
      deleted: 0
    }
    return this.http.post<any>(this.URL_API_SECTOR, sector);
  }

  logicalDeleteSector(id: string) : Observable<any> {
    return this.http.get<any>(this.URL_API_SECTOR + "/" + id).pipe(
      map((sector) => {
        let modifiedSector = { ...sector, deleted: 1 };
        return modifiedSector;
      }),
      switchMap((modifiedSector) => this.http.put <any> (this.URL_API_SECTOR + "/" + id, modifiedSector))
    );
  }
}
