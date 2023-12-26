import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../../services/supplier-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { proveedor } from '../../../models/proveedores';
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'app-form-suppliers',
  templateUrl: './form-suppliers.component.html',
  styleUrl: './form-suppliers.component.css'
})
export class FormSuppliersComponent implements OnInit{

  constructor(public supplierService: SupplierServiceService, private route:ActivatedRoute, private router:Router){}

  parametroURL : string = this.route.snapshot.params['edit'] || false;
  tituloFormulario = "Agregar Proveedor"

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

  msjValidCode = "";
  validEmail = true;
  validEmailContacto = true;

  ngOnInit(): void {
    if(this.parametroURL) {
      this.tituloFormulario = "Editar Proveedor";
      this.getASupplier(this.parametroURL)
    }
    else{
      this.supplierService.clearSupplierData()
    }
  }

  getASupplier(id : string){
    this.supplierService.getASupplier(id).subscribe(
      (response) =>{
        console.log(response)
        this.supplierService.setSupplierForEdit(response)
      }
    )
  }

  onClickForm(formularioProveedores:NgForm){
    this.validarFormulario();
    console.log(formularioProveedores.valid)
    if(formularioProveedores.valid && this.validarFormulario()){
      if(this.parametroURL){
        this.supplierService.editSupplier(this.parametroURL).subscribe((response)=> console.log(response))
      } else {
        this.supplierService.saveSupplier().subscribe((response)=> console.log(response))
      }
      this.supplierService.clearSupplierData()
      alert("Los datos del proveedor fueron cargados exitosamente")
      this.router.navigate(["proveedores"])
    } else{
      alert("Por favor, compruebe que no haya campos erróneos en el formulario")
    }
  }

  validarFormulario() : boolean{
    const codigoValido = this.validarCodigo(this.supplierService.supplier.codigo) 
    const emailValido = this.validarEmail(this.supplierService.supplier.email)
    const emailContactoValido = this.validarEmailContacto(this.supplierService.supplier.contacto.email)
    return(codigoValido && emailValido && emailContactoValido)
  }
  

  validarCodigo(stringToValidate : string){
    const regexCode = new RegExp('^[a-zA-Z0-9]+$');
    if (!regexCode.test(stringToValidate)){
      this.msjValidCode = "Solo se permiten números o letras"
      return false;
    }
    this.msjValidCode = ""
    return true;
  }

  validarEmail(stringToValidate : string) :boolean {
    const regexCode = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.validEmail = regexCode.test(stringToValidate)
    return regexCode.test(stringToValidate)
  }

  validarEmailContacto(stringToValidate: string): boolean {
    const regexCode = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.validEmailContacto = regexCode.test(stringToValidate);
    return this.validEmailContacto;
  }

  cancelar(){
    const confirmar = confirm("¿Seguro desea salir? Los datos se perderán")
    if(confirmar){
      this.router.navigate(["proveedores"])
    }
  }

  cancelarHome(){
    const confirmar = confirm("¿Seguro desea salir? Los datos se perderán")
    if(confirmar){
      this.router.navigate([""])
    }
  }

}
