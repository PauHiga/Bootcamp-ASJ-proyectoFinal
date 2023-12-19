import { Component, OnInit } from '@angular/core';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-form-suppliers',
  templateUrl: './form-suppliers.component.html',
  styleUrl: './form-suppliers.component.css'
})
export class FormSuppliersComponent implements OnInit  {

  proveedores: any = [];

  constructor(private router:Router, public suppliersService:SuppliersServiceService){}

  ngOnInit(): void {
    this.proveedores = this.suppliersService.getSuppliers();
  }

  codigo = ""
  razonSocial = ""
  rubro = ""
  email = ""
  telefono = ""
  web = ""
  calle = ""
  altura = ""
  codigoPostal = ""
  provincia = ""
  localidad = ""
  pais = ""
  cuit = ""
  condicionIVA = ""
  nombreContacto = ""
  apellidoContacto = ""
  telefonoContacto = ""
  emailContacto = ""
  rolContacto = ""

  addProveedor(){
      const datosProveedor = {
          codigo: 99,
          razonSocial: this.razonSocial,
          rubro: this.rubro,
          email: this.email,
          telefono: this.telefono,
          web: this.web,
          calle: this.calle,
          altura: this.altura,
          codigoPostal: this.codigoPostal,
          provincia: this.provincia,
          localidad: this.localidad,
          pais: this.pais,
          cuit: this.cuit,
          condicionIVA: this.condicionIVA,
          nombreContacto: this.nombreContacto,
          apellidoContacto: this.apellidoContacto,
          telefonoContacto: this.telefonoContacto,
          emailContacto: this.emailContacto,
          rolContacto: this.rolContacto
      };

      this.suppliersService.addSupplier(datosProveedor);
      this.router.navigate(['/proveedores'])
  }

  eraseForm(){
    this.codigo = ""
    this.razonSocial = ""
    this.rubro = ""
    this.email = ""
    this.telefono = ""
    this.web = ""
    this.calle = ""
    this.altura = ""
    this.codigoPostal = ""
    this.provincia = ""
    this.localidad = ""
    this.pais = ""
    this.cuit = ""
    this.condicionIVA = ""
    this.nombreContacto = ""
    this.apellidoContacto = ""
    this.telefonoContacto = ""
    this.emailContacto = ""
    this.rolContacto = ""
  }

}
