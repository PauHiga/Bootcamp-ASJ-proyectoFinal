import { Injectable } from '@angular/core';
import { proveedor } from '../models/proveedores';
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

  getSuppliers() : Observable<proveedor[]>{
    return this.http.get<Supplier[]>(this.URL_API).pipe(
      map((supplier)=>{
        const filteredSupplier = supplier.filter((item : Supplier)=> item.deleted == false)
        const adaptedSupplier : proveedor[] = filteredSupplier.map((item : Supplier) => {
          const adaptedItem : proveedor  = {
            id: String(item.id),
            codigo: item.code,
            razonSocial: item.business_name,
            rubro: item.sector,
            URLlogo: item.url_logo,
            CUIT: item.cuit,
            condicionIva: item.vatCondition,
            email: item.email,
            telefono: item.phone,
            web: item.web,
            direccion: {
              calle: item.address.street,
              altura: item.address.number,
              CP: item.address.postal_code,
              pais: item.address.country,
              provincia: item.address.province,
              localidad: item.address.locality,
          },
            contacto: {
              nombre: item.contact.first_name,
              apellido: item.contact.last_name,
              email: item.contact.email,
              telefono: item.contact.phone,
              rol: item.contact.role
          },
            deleted: item.deleted
        }
          return adaptedItem})
        return adaptedSupplier;
      })
    );
  }

  getASupplier(id:string) : Observable<proveedor>{
    return this.http.get<any>(this.URL_API + "/" + id).pipe(
      map((supplier)=>{
          const adaptedItem : proveedor  = {
            id: String(supplier.id),
            codigo: supplier.code,
            razonSocial: supplier.business_name,
            rubro: supplier.sector.name,
            URLlogo: supplier.url_logo,
            CUIT: supplier.cuit,
            condicionIva: supplier.vatcondition.name,
            email: supplier.email,
            telefono: supplier.phone,
            web: supplier.web,
            direccion: {
              calle: supplier.address.street,
              altura: supplier.address.number,
              CP: supplier.address.postal_code,
              pais: supplier.address.locality.province.country.name,
              provincia: supplier.address.locality.province.name,
              localidad: supplier.address.locality.name,
          },
            contacto: {
              nombre: supplier.contact.first_name,
              apellido: supplier.contact.last_name,
              email: supplier.contact.email,
              telefono: supplier.contact.phone,
              rol: supplier.contact.role
          },
            deleted: supplier.deleted
        }
          return adaptedItem;
      })
      );
    }
    
  saveSupplier(supplierToSave : proveedor) : Observable<proveedor>{  

    const contact : Contact = {
      first_name: supplierToSave.contacto.nombre,
      last_name: supplierToSave.contacto.apellido,
      email: supplierToSave.contacto.email,
      phone: supplierToSave.contacto.telefono,
      role: supplierToSave.contacto.rol
    }

    const address : Address = {
      street: supplierToSave.direccion.calle,
      number: supplierToSave.direccion.altura,
      postal_code: supplierToSave.direccion.CP,
      country: supplierToSave.direccion.pais,
      province: supplierToSave.direccion.provincia,
      locality: supplierToSave.direccion.localidad
    }

    const sendSupplier : SupplierCreate = {
      code: supplierToSave.codigo,
      business_name: supplierToSave.razonSocial,
      sector: supplierToSave.rubro,
      urlLogo: supplierToSave.URLlogo,
      cuit: supplierToSave.CUIT,
      vatCondition: supplierToSave.condicionIva,
      email: supplierToSave.email,
      phone: supplierToSave.telefono,
      web: supplierToSave.web,
      address: address,
      contact: contact
  }
    console.log(sendSupplier);  
    return this.http.post<proveedor>(this.URL_API, sendSupplier);
  }

  editSupplier(supplierToEdit : proveedor, id: string){
    console.log(supplierToEdit);
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

  getVatCondition() : Observable<any>{
    return this.http.get<any>(this.URL_API_VAT);
  }
}
