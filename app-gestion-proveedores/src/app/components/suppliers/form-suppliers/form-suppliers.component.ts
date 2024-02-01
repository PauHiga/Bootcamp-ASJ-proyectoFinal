import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../../services/supplier-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CountryStateCityService } from '../../../services/country-state-city.service';
import Swal from 'sweetalert2'
import { SectorService } from '../../../services/sector.service';
import { Supplier } from '../../../models/supplier';

@Component({
  selector: 'app-form-suppliers',
  templateUrl: './form-suppliers.component.html',
  styleUrl: './form-suppliers.component.css'
})
export class FormSuppliersComponent implements OnInit{

  constructor(public supplierService: SupplierServiceService, private sectorService: SectorService, private countryService: CountryStateCityService, private route:ActivatedRoute, private router:Router){}

  parametroURL : string = this.route.snapshot.params['edit'] || false;
  tituloFormulario = "Agregar Proveedor"

  supplier: Supplier = {
    id: 0,
    code: '',
    business_name: '',
    sector: '',
    url_logo: '',
    cuit: '',
    vat_condition: '',
    email: '',
    phone: '',
    web: '',
    address : {
      street: '',
      number: '',
      postal_code: '',
      country: '',
      province: '',
      locality: '',
    },
    contact: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      role: ''
    },
    deleted: false,
  }

  //To check if the supplier code is unique:
  suppliersList : Supplier[] = [];

  sectors : any[] = []
  vat_conditions : String[] = []

  countries : any[] = []
  states : any[] = []

  codigoProveedorRepetido : boolean = false;

  validCode : boolean = true;
  validEmail : boolean = true;
  validEmailContacto : boolean = true;
  validCUIT : boolean = true;
  validTelefono : boolean = true;
  validTelefonoContacto : boolean = true

  ngOnInit(): void {
    this.getCountries()
    this.getSectors();
    // this.getProveedores();
    this.getvat_condition();
    if(this.parametroURL) {
      this.tituloFormulario = "Editar Proveedor";
      this.getASupplier(Number(this.parametroURL));
    }
    else{
      this.clearSupplierData()
    }
  }

  getProveedores(){
    this.supplierService.getSuppliers().subscribe((response)=>{
      console.log(response);
      this.suppliersList = response;
    })
  }

  getSectors(){
    this.sectorService.getSectors().subscribe((response)=>{
      this.sectors = response.filter((item: any)=> item.deleted == false);
    })
  }

  getvat_condition(){
    this.supplierService.getvat_condition().subscribe((response)=>{
      this.vat_conditions = response;
    })
  }

  getASupplier(id : number){
    this.supplierService.getASupplier(id).subscribe(
      (response) =>{
        console.log(response);
        this.supplier = response;
        this.filterState();
        this.supplier.deleted = false;
      }
    )
  }

  getCountries(){
    this.countryService.getCountries().subscribe((response)=>{
      this.countries = response;
    })
  }

  filterState(){
    const selectedCountry = this.countries.find(item => item.name == this.supplier.address.country);
    this.states = selectedCountry.states;
  }

  onClickForm(formularioProveedores:NgForm){
    this.validarFormulario();
    console.log(formularioProveedores.valid)
    if(formularioProveedores.valid && this.validarFormulario()){
      if(this.parametroURL){
        this.supplierService.editSupplier(this.supplier, this.parametroURL).subscribe((response)=>{
          console.log(response)
          this.clearSupplierData()
          Swal.fire("Los datos del proveedor fueron cargados exitosamente");
          this.router.navigate(["proveedores"])

        })
      } else {
        this.supplierService.saveSupplier(this.supplier).subscribe((response)=> {
          console.log(response)
          this.clearSupplierData()
          Swal.fire("Los datos del proveedor fueron cargados exitosamente");
          this.router.navigate(["proveedores"])
        })
      }
    } else{
      Swal.fire({
        text: "Hay campos incompletos o erróneos. Por favor, revise el formulario",
        icon: "warning"
      });
    }
  }

  validarFormulario() : boolean{
    const codigoValido = this.validarCodigo(this.supplier.code) 
    const emailValido = this.validarEmail(this.supplier.email)
    const emailContactoValido = this.validarEmailContacto(this.supplier.contact.email)
    const validarCUIT = this.validarCUIT(this.supplier.cuit);
    const validarTelefono =  this.validarTelefono(this.supplier.phone)
    const validarTelefonoContacto =  this.validarTelefonoContacto(this.supplier.contact.phone)
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
    Swal.fire({
      text: "Are you sure you want to exit? The modifications won't be saved",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Leave this page",
      cancelButtonText: "Stay in this page"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([objetivo])
      }
    });
  }

  onCUITChange(newValue: string): void {
    const formattedValue = this.formatCUIT(newValue);
    this.supplier.cuit = formattedValue;
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
    const suppliersCodeArray = this.suppliersList.map(item=> item.code)
    this.codigoProveedorRepetido = suppliersCodeArray.includes(currentSupplierCode);
  }

  //Clear the form
  clearSupplierData(){
    this.supplier = {
      id: 0,
      code: '',
      business_name: '',
      sector: '',
      url_logo: '',
      cuit: '',
      vat_condition: '',
      email: '',
      phone: '',
      web: '',
      address : {
        street: '',
        number: '',
        postal_code: '',
        country: '',
        province: '',
        locality: '',
      },
      contact: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: ''
      },
      deleted: false,
    }
  }

  //Add a new sector
  addSectorModal(){
    Swal.fire({
      title: "New sector",
      text: "Write a new sector",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Save sector",
      allowOutsideClick: () => !Swal.isLoading(),
      inputValidator: (value): any => {
        if (value == '') {
          return "You need to write something!";
        } else if (this.sectors.some(item => (item.name.toUpperCase() === value.toUpperCase()) && item.deleted==false )){
          return "That sector name already exists!";
        }
      }
    }).then((result) => {
      const exists = this.sectors.some(item => item.name === result.value);
      if (result.isConfirmed && !exists) {
        this.sectorService.saveSector(result.value).subscribe((result)=> {
          this.getSectors();
          this.supplier.sector = result.name;
          Swal.fire({
            text: `The sector "${result.value}" has been saved`,
          });
        })


      }
    });
  }

    //Edit or delete a sector
    editSectorModal(){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          denyButton: "btn btn-danger",
          cancelButton: "btn btn-secondary",
        },
        buttonsStyling: true
      });
      
      const options = Object.fromEntries(this.sectors.map(item => [item.id, item.name]))
      swalWithBootstrapButtons.fire({
        title: "Edit or Delete Sector",
        text: "Select a sector to edit or delete",
        input: "select",
        inputOptions: options,
        inputPlaceholder: "Select a sector to edit or delete",
        showDenyButton: true,
        returnInputValueOnDeny: true,
        showCancelButton: true,
        confirmButtonText: "Edit sector",
        denyButtonText: "Delete sector",
        allowOutsideClick: () => !Swal.isLoading(),
        inputValidator: (value): any => {
          if (value == '') {
            return "You need to choose a sector!";
          }
        }
      }).then((result) => {
        const chosenOption = this.sectors.find(item => item.id == result.value).name
        const chosenOptionId = result.value
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Edit sector name",
            text: "Write a new name for the sector: " + chosenOption,
            showCancelButton: true,
            confirmButtonText: "Accept new name",
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.sectorService.changeSectorName(chosenOptionId, result.value).subscribe((result)=> 
              {
                console.log(result);
                Swal.fire({
                  title: "Sector edited",
                  text: "The sector has been edited",
                  icon: "success"
                });
                this.getSectors();
              })
            }
          });
        }
        else if (result.isDenied) {
          swalWithBootstrapButtons.fire({
            title: `Are you sure you want to delete "${chosenOption}"?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d63043",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              this.sectorService.logicalDeleteSector(chosenOptionId).subscribe((result)=> 
              {
                Swal.fire({
                  text: `Category "${result.name}" has been deleted`,
                });
                this.getSectors();
              })
            }
          })
        };
      })
    }

    //Edit or Delete a sector
    // editSectorModal(){
    //   const options = Object.fromEntries(this.sectors.map(item => [item.id, item.name]))
    //   Swal.fire({
    //     title: "Delete Sector",
    //     text: "Select a sector to delete",
    //     input: "select",
    //     inputOptions: options,
    //     inputPlaceholder: "Select a sector",
    //     showCancelButton: true,
    //     confirmButtonText: "Delete sector",
    //     allowOutsideClick: () => !Swal.isLoading(),
    //     inputValidator: (value): any => {
    //       if (value == '') {
    //         return "You need to choose something!";
    //       }
    //     }
    //   }).then((result) => {
    //     if (result.isConfirmed && result.value != '') {
    //       const chosenOption = this.sectors.find(item => item.id == result.value).name
    //       this.sectorService.logicalDeleteSector(result.value).subscribe((result)=> {
    //         console.log(result);
    //       })
    //       Swal.fire({
    //         text: `Sector "${chosenOption}" has been deleted`,
    //       });
    //       //No alcanza con llamar de nuevo a los sectores para refrescar. Se ve que se tarda mucho en actualizar todo. Voy a hacer el cambio en el front en paralelo.
    //       this.sectors = this.sectors.filter(item => item.id !=result.value)
    //     }
    //   });
    // }
}


