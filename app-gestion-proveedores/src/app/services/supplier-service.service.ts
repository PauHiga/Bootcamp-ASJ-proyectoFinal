import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:8080/suppliers'
  URL_API_SECTOR = 'http://localhost:8080/sectors'
  URL_API_VAT = 'http://localhost:8080/vat-conditions'

  getSuppliers() : Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.URL_API)
  }

  // getSuppliers2() : Observable<Supplier[]>{
  //   return this.http.get<Supplier[]>(this.URL_API).pipe(
  //     map((supplier)=>{
  //       const filteredSupplier = supplier.filter((item : Supplier)=> item.deleted == false)
  //       return filteredSupplier;
  //     })
  //   );
  // }

  getASupplier(id:number) : Observable<Supplier>{
    return this.http.get<any>(this.URL_API + "/" + id).pipe(
      map((supplier)=>{
        console.log(supplier);
          const adaptedItem : Supplier  = {
            ...supplier,
            vat_condition: supplier.vat_condition.name,
            sector: supplier.sector.name,
            address: {
              ...supplier.address,
              country: supplier.address.locality.province.country.name,
              province: supplier.address.locality.province.name,
              locality: supplier.address.locality.name,
          }
        }
          return adaptedItem;
      })
      );
    }
    
  saveSupplier(supplierToSave : Supplier) : Observable<Supplier>{  
    return this.http.post<Supplier>(this.URL_API, supplierToSave).pipe(
      catchError((error: any) => {
        throw error; 
      })
    );
  }

  editSupplier(supplierToEdit : Supplier, id: string){
    return this.http.put(this.URL_API + "/" + id, supplierToEdit).pipe(
      catchError((error: any) => {
        throw error; 
      })
    );
  }

  logicalDeleteSupplier(id: number) : Observable<Supplier> {
    return this.http.put<Supplier>(this.URL_API + "/" + id, {deleted: true}).pipe(
      catchError((error: any) => {
        throw error; 
      })
    );
  }

  getvat_condition() : Observable<any>{
    return this.http.get<any>(this.URL_API_VAT);
  }
}
