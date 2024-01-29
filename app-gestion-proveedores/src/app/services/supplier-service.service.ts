import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Supplier } from '../models/supplier';
import { Address } from '../models/address';
import { Contact } from '../models/contact';
import { SupplierCreate } from '../models/supplierCreate';

@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:8080/suppliers'
  URL_API_SECTOR = 'http://localhost:8080/sectors'
  URL_API_VAT = 'http://localhost:8080/vat-conditions'

  getSuppliers() : Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.URL_API).pipe(
      map((supplier)=>{
        const filteredSupplier = supplier.filter((item : Supplier)=> item.deleted == false)
        // const adaptedSupplier : Supplier[] = filteredSupplier.map((item : Supplier) => {
        //   const adaptedItem : Supplier  = {
        //     id: item.id,
        //     code: item.code,
        //     business_name: item.business_name,
        //     sector: item.sector,
        //     URLlogo: item.url_logo,
        //     CUIT: item.cuit,
        //     vat_condition: item.vat_condition,
        //     email: item.email,
        //     telefono: item.phone,
        //     web: item.web,
        //     direccion: {
        //       calle: item.address.street,
        //       altura: item.address.number,
        //       CP: item.address.postal_code,
        //       pais: item.address.country,
        //       provincia: item.address.province,
        //       localidad: item.address.locality,
        //   },
        //     contacto: {
        //       nombre: item.contact.first_name,
        //       apellido: item.contact.last_name,
        //       email: item.contact.email,
        //       telefono: item.contact.phone,
        //       rol: item.contact.role
        //   },
        //     deleted: item.deleted
        // }n
        //   return adaptedItem})
        return filteredSupplier;
      })
    );
  }

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

  //   const contact : Contact = {
  //     first_name: supplierToSave.contacto.nombre,
  //     last_name: supplierToSave.contacto.apellido,
  //     email: supplierToSave.contacto.email,
  //     phone: supplierToSave.contacto.telefono,
  //     role: supplierToSave.contacto.rol
  //   }

  //   const address : Address = {
  //     street: supplierToSave.direccion.calle,
  //     number: supplierToSave.direccion.altura,
  //     postal_code: supplierToSave.direccion.CP,
  //     country: supplierToSave.direccion.pais,
  //     province: supplierToSave.direccion.provincia,
  //     locality: supplierToSave.direccion.localidad
  //   }

  //   const sendSupplier : SupplierCreate = {
  //     code: supplierToSave.codigo,
  //     business_name: supplierToSave.business_name,
  //     sector: supplierToSave.rubro,
  //     urlLogo: supplierToSave.URLlogo,
  //     cuit: supplierToSave.CUIT,
  //     vat_condition: supplierToSave.vat_condition,
  //     email: supplierToSave.email,
  //     phone: supplierToSave.telefono,
  //     web: supplierToSave.web,
  //     address: address,
  //     contact: contact
  // }
  //   console.log(sendSupplier);  
    return this.http.post<Supplier>(this.URL_API, supplierToSave);
  }

  editSupplier(supplierToEdit : Supplier, id: string){
    console.log(supplierToEdit);
    return this.http.put(this.URL_API + "/" + id, supplierToEdit);
  }

  logicalDeleteSupplier(id: number) : Observable<Supplier> {
    return this.http.get<Supplier>(this.URL_API + "/" + id).pipe(
      map((supplier) => {
        let modifiedSupplier = { ...supplier, deleted: true };
        return modifiedSupplier;
      }),
      switchMap((modifiedSupplier) => this.http.put <Supplier> (this.URL_API + "/" + id, modifiedSupplier))
    );
  }

  getvat_condition() : Observable<any>{
    return this.http.get<any>(this.URL_API_VAT);
  }
}
