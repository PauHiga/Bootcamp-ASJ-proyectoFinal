import { Component } from '@angular/core';
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'app-suppliers-display',
  templateUrl: './suppliers-display.component.html',
  styleUrl: './suppliers-display.component.css'
})
export class SuppliersDisplayComponent {
  proveedores = [{
    codigo: 99,
    razonSocial: "this.razonSocial",
    rubro: "this.rubro",
    email: "this.email",
    telefono: "this.telefono",
    web: "this.web",
    calle: "this.calle",
    altura: "this.altura",
    codigoPostal: "this.codigoPostal",
    provincia: "this.provincia",
    localidad: "this.localidad",
    pais: "this.pais",
    cuit: "this.cuit",
    condicionIVA: "this.condicionIVA",
    nombreContacto: "this.nombreContacto",
    apellidoContacto: "this.apellidoContacto",
    telefonoContacto: "this.telefonoContacto",
    emailContacto: "this.emailContacto",
    rolContacto: "this.rolContacto"
}]

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
    console.log(this.proveedores)
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

    this.proveedores.push(datosProveedor)

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


  // eliminar(codigo){
  //   let filteredProveedores = this.proveedores.filter(proveedor => proveedor.codigo !== codigo)
  //   this.proveedores = filteredProveedores;
  // }

}
