import { Injectable } from '@angular/core';
import { proveedor } from '../models/proveedores';
import { proveedoresEjemplo } from '../datos/proveedores';

@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  constructor() { }

  supplier: proveedor = {
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

  suppliers : proveedor[] = proveedoresEjemplo;

  getSuppliers(){
    return this.suppliers;
  }

  setSupplierForEdit(codigo:string){
    const selectedSupplier = this.suppliers.find(item => item.codigo == codigo)
    if(selectedSupplier){
      this.supplier = selectedSupplier;
    }
  }

  editSupplier(){
    this.suppliers = this.suppliers.map(item => item.codigo == this.supplier.codigo ? this.supplier : item);
  }

  deleteSupplier(codigo:string){
    this.suppliers = this.suppliers.filter(item => item.codigo != codigo);
  }

  saveSupplier(){
    this.suppliers.push(this.supplier)
  }

  clearSupplierData(){
    this.supplier = {
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
