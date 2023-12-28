import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../../services/supplier-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { proveedor } from '../../../models/proveedores';
import { CountryStateCityService } from '../../../services/country-state-city.service';

@Component({
  selector: 'app-form-suppliers',
  templateUrl: './form-suppliers.component.html',
  styleUrl: './form-suppliers.component.css'
})
export class FormSuppliersComponent implements OnInit{

  constructor(public supplierService: SupplierServiceService, private countryService: CountryStateCityService, private route:ActivatedRoute, private router:Router){}

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
    },
    deleted: false,
  }

  suppliersList : proveedor[] = [];
  
  countries : any[] = []
  states : any[] = []
  cities : any[] = []

  codigoProveedorRepetido : boolean = false;

  validCode : boolean = true;
  validEmail : boolean = true;
  validEmailContacto : boolean = true;
  validCUIT : boolean = true;
  validTelefono : boolean = true;
  validTelefonoContacto : boolean = true

  disabledInEdit : boolean = false;

  ngOnInit(): void {
    this.getCountries()
    this.getProveedores();
    if(this.parametroURL) {
      this.tituloFormulario = "Editar Proveedor";
      this.getASupplier(this.parametroURL);
      this.disabledInEdit = true;
    }
    else{
      this.clearSupplierData()
    }
  }

  getProveedores(){
    this.supplierService.getSuppliers().subscribe((response)=>{
      this.suppliersList = response;
    })
  }

  getASupplier(id : string){
    this.supplierService.getASupplier(id).subscribe(
      (response) =>{
        this.supplier = response
        this.filterCity()
        this.filterState()
      }
    )
  }

  getCountries(){
    this.countryService.getCountriesStates().subscribe((response)=>{
      this.countries = response.data.map((item : any)=>{
        const country = {name: item.name, states: item.states}
          return country;
      })
    })
  }

  filterState(){
    const selectedCountry = this.countries.find(item => item.name == this.supplier.direccion.pais);
    console.log(selectedCountry)
    this.states = selectedCountry.states;
  }

  filterCity(){
    const cityState = {
      country: this.supplier.direccion.pais,
      state: this.supplier.direccion.provincia
    }
    this.countryService.getCities(cityState).subscribe((response) => {
      console.log(response)
      this.cities = response.data
    })
  }

  onClickForm(formularioProveedores:NgForm){
    this.validarFormulario();
    console.log(formularioProveedores.valid)
    if(formularioProveedores.valid && this.validarFormulario()){
      if(this.parametroURL){
        this.supplierService.editSupplier(this.supplier, this.parametroURL).subscribe((response)=> console.log(response))
      } else {
        this.supplierService.saveSupplier(this.supplier).subscribe((response)=> console.log(response))
      }
      this.clearSupplierData()
      alert("Los datos del proveedor fueron cargados exitosamente")
      this.router.navigate(["proveedores"])
    } else{
      alert("Por favor, compruebe que no haya campos erróneos en el formulario")
    }
  }

  validarFormulario() : boolean{
    const codigoValido = this.validarCodigo(this.supplier.codigo) 
    const emailValido = this.validarEmail(this.supplier.email)
    const emailContactoValido = this.validarEmailContacto(this.supplier.contacto.email)
    const validarCUIT = this.validarCUIT(this.supplier.CUIT);
    const validarTelefono =  this.validarTelefono(this.supplier.telefono)
    const validarTelefonoContacto =  this.validarTelefonoContacto(this.supplier.telefono)
    return(codigoValido && emailValido && emailContactoValido && validarCUIT && validarTelefono && validarTelefonoContacto)
  }

  validarCodigo(stringToValidate : string){
    const regexCode = new RegExp('^[a-zA-Z0-9]+$');
    this.validCode = regexCode.test(stringToValidate)
    return regexCode.test(stringToValidate)
  }

  validarCUIT(stringToValidate : string){
    const regexCode = new RegExp('^[0-9-]{13}$');
    this.validCUIT = regexCode.test(stringToValidate)
    return regexCode.test(stringToValidate)
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

  validarTelefono(stringToValidate: string): boolean {
    const regexCode = /^[0-9()+\s-]{5,}$/;
    this.validTelefono = regexCode.test(stringToValidate);
    return this.validTelefono;
  }

  validarTelefonoContacto(stringToValidate: string): boolean {
    const regexCode = /^[0-9()+\s-]{5,}$/;
    this.validTelefonoContacto = regexCode.test(stringToValidate);
    return this.validTelefonoContacto;
  }

  cancelar(objetivo: string){
    const confirmar = confirm("¿Seguro desea salir? Los datos se perderán")
    if(confirmar){
      this.router.navigate([objetivo])
    }
  }

  onCUITChange(newValue: string): void {
    const formattedValue = this.formatCUIT(newValue);
    this.supplier.CUIT = formattedValue;
  }

  // Method to format the CUIT
  private formatCUIT(value: string): string {
    let stringWithoutHyphens = value.replace(/-/g, '')
    if (stringWithoutHyphens.length == 1 || stringWithoutHyphens.length == 0) {
      return stringWithoutHyphens;
    } if (stringWithoutHyphens.length <=9 && stringWithoutHyphens.length>1){
      return stringWithoutHyphens.slice(0, 2) + '-' + stringWithoutHyphens.slice(2, 10)
    }
    return stringWithoutHyphens.slice(0, 2) + '-' + stringWithoutHyphens.slice(2, 10) + '-' + stringWithoutHyphens.slice(10, 11);
  }

  //Check if the supplier code is unique
  supplierCodeIsUnique(event : Event){
    const currentSupplierCode = (event.target as HTMLSelectElement).value;
    const suppliersCodeArray = this.suppliersList.map(item=> item.codigo)
    this.codigoProveedorRepetido = suppliersCodeArray.includes(currentSupplierCode);
  }

  //Clear the form
  clearSupplierData(){
    this.supplier = {
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
      },
      deleted: false,
    }
  }
}
