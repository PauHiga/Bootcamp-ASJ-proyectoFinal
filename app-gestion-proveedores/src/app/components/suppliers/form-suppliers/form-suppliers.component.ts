import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../../services/supplier-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CountryStateCityService } from '../../../services/country-state-city.service';
import Swal from 'sweetalert2'
import { SectorService } from '../../../services/sector.service';
import { Supplier } from '../../../models/supplier';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-form-suppliers',
  templateUrl: './form-suppliers.component.html',
  styleUrl: './form-suppliers.component.css'
})
export class FormSuppliersComponent implements OnInit{

  constructor(public supplierService: SupplierServiceService, private sectorService: SectorService, private countryService: CountryStateCityService, private route:ActivatedRoute, private router:Router){}

  parametroURL : string = this.route.snapshot.params['edit'] || false;
  title = "Create Supplier"

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

  supplierCodeRepeated : boolean = false;

  validCode : boolean = true;
  validEmail : boolean = true;
  validEmailContacto : boolean = true;
  validCUIT : boolean = true;
  validTelefono : boolean = true;
  validTelefonoContacto : boolean = true

  ngOnInit(): void {
    this.getCountries()
    this.getSectors();
    this.getvat_condition();
    this.getSuppliers();
    if(this.parametroURL) {
      this.title = "Edit Supplier";
      this.getASupplier(Number(this.parametroURL));
    }
    else{
      this.clearSupplierData()
    }
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

  getSuppliers(){
    this.supplierService.getSuppliers().subscribe((response)=>{
      this.suppliersList = response;
    })
  }

  getASupplier(id : number){
    this.supplierService.getASupplier(id).subscribe(
      (response) =>{
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

  onClickForm(supplierForm:NgForm){
    this.validarFormulario();
    if(supplierForm.valid && this.validarFormulario()){
      if(this.parametroURL){
        this.supplierService.editSupplier(this.supplier, this.parametroURL).subscribe( {
          next:(data)=>{
          this.clearSupplierData()
          Swal.fire("The supplier's data was successfully loaded.");
          this.router.navigate(["suppliers"])
        },
        error: (error)=>{
          console.log(error);
          Swal.fire({
            title: "Supplier not saved",
            text: "There was an error! The supplier could not be saved",
            icon: "info"
          }
        )}})
      } else {
        this.supplierService.saveSupplier(this.supplier).subscribe( {
          next:(data)=> {
          this.clearSupplierData()
          Swal.fire({
            text: "The supplier's data was successfully loaded",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#3085d6",
            cancelButtonText: "Return to suppliers list",
            confirmButtonText: "Create a product"
          }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
              this.router.navigate(["products/product-form"])
            } else{
              this.router.navigate(["suppliers"])
            }
          });

          this.router.navigate(["suppliers"])
        },
        error: (error)=>{
          Swal.fire({
            title: "Supplier not saved",
            text: "There was an error! The supplier could not be saved",
            icon: "error"
          }
        )}
        })}
    } else{
      Swal.fire({
        text: "There are incomplete or incorrect fields. Please check the form.",
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
    const regexCode = new RegExp('^[a-zA-Z0-9]{4,}$');
    this.validCode = regexCode.test(stringToValidate)
    return regexCode.test(stringToValidate)
  }

  validarCUIT(stringToValidate : string){
    const regexCode = new RegExp('^\\d{2}-\\d{8}-\\d{1}$');
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
    const regexCode = /^\+?[0-9()\s-]{5,}$/;
    this.validTelefono = regexCode.test(stringToValidate);
    return this.validTelefono;
  }

  validarTelefonoContacto(stringToValidate: string): boolean {
    const regexCode = /^\+?[0-9()\s-]{5,}$/;
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
      confirmButtonText: "Leave this page",
      cancelButtonText: "Stay in this page"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([objetivo])
      }
    });
  }

  //Format the cuit
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
    this.supplierCodeRepeated = suppliersCodeArray.includes(currentSupplierCode);
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
        this.sectorService.saveSector(result.value).subscribe( {
          next:(data)=> {
            console.log(data);
          this.getSectors();
          this.supplier.sector = data.name;
          Swal.fire({
            text: `The sector "${data.name}" has been saved`,
          });
        }, 
        error: (error)=>{
          console.log(error);
          Swal.fire({
            title: "Sector not saved",
            text: "There was an error! The sector could not be saved",
            icon: "error"
          });
        }})
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
              this.sectorService.changeSectorName(chosenOptionId, result.value).subscribe( {
                next:(data)=> 
              {
                Swal.fire({
                  title: "Sector edited",
                  text: "The sector has been edited",
                  icon: "success"
                });
                this.getSectors();
              }, 
              error: (error)=> {
                console.log(error);
                Swal.fire({
                  title: "Sector not edited",
                  text: "There was an error! The sector could not be edited",
                  icon: "error"
                });
              }})
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
              this.sectorService.logicalDeleteSector(chosenOptionId).subscribe( {
                next:(data)=> 
              {
                Swal.fire({
                  text: `Category "${data.name}" has been deleted`,
                });
                this.getSectors();
              },
              error: (error) =>{
                Swal.fire({
                  title: "Sector not deleted",
                  text: "There was an error! The sector could not be deleted.",
                  icon: "error"
                });
              }
            })
            }
          })
        };
      })
    }
}


