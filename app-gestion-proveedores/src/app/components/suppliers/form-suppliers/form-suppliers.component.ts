import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../../services/supplier-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-suppliers',
  templateUrl: './form-suppliers.component.html',
  styleUrl: './form-suppliers.component.css'
})
export class FormSuppliersComponent implements OnInit{

  constructor(public supplierService: SupplierServiceService, private route:ActivatedRoute, private router:Router){}

  parametroURL = this.route.snapshot.params['edit'] || false;
  tituloFormulario = "Agregar Proveedor"

  ngOnInit(): void {
    if(this.parametroURL) {
      this.tituloFormulario = "Editar Proveedor";
      this.supplierService.setSupplierForEdit(this.parametroURL)}
    else{
      this.supplierService.clearSupplierData()
    }
  }

  onClickForm(formularioProveedores:NgForm){
    if(this.parametroURL){
      this.supplierService.editSupplier()
    } else {
      this.supplierService.saveSupplier()
    }
    this.supplierService.clearSupplierData()
    this.router.navigate(["proveedores"])
  }

}
