import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../../services/supplier-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { proveedor } from '../../../models/proveedores';

@Component({
  selector: 'app-form-suppliers',
  templateUrl: './form-suppliers.component.html',
  styleUrl: './form-suppliers.component.css'
})
export class FormSuppliersComponent implements OnInit{

  constructor(public supplierService: SupplierServiceService, private route:ActivatedRoute, private router:Router){}

  parametroURL : string = this.route.snapshot.params['edit'] || false;
  tituloFormulario = "Agregar Proveedor"

  supplier = {};

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
    if(this.parametroURL){
      this.supplierService.editSupplier(this.parametroURL).subscribe((response)=> console.log(response))
    } else {
      this.supplierService.saveSupplier().subscribe((response)=> console.log(response))
    }
    this.supplierService.clearSupplierData()
    this.router.navigate(["proveedores"])
  }

}
