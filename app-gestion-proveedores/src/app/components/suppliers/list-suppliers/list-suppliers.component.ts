import { Component, OnInit } from '@angular/core';
import {proveedoresEjemplo} from '../../../datos/proveedores'
import { proveedor } from '../../../models/proveedores';
import { SupplierServiceService } from '../../../services/supplier-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-suppliers',
  templateUrl: './list-suppliers.component.html',
  styleUrl: './list-suppliers.component.css'
})
export class ListSuppliersComponent implements OnInit{

  constructor(public supplierService: SupplierServiceService, private router:Router){}

  proveedores : proveedor[] = []

  ngOnInit(): void {
    this.createSuppliersList();
  }

  createSuppliersList(){
    this.supplierService.getSuppliers().subscribe( (response) => {
      this.proveedores = response;
    })
  }

  

  deleteSupplier(id:string){
    const confirmar = confirm("¿Eliminar proveedor?")
    if (confirmar){
      this.supplierService.deleteSupplier(id).subscribe(
        (response) => {
          this.createSuppliersList();
        }
      )
    }
  }
  editSupplier(id:string){
    const selectedSupplier = this.proveedores.find(item => item.id == id)
    if(!selectedSupplier){
      console.log("Error! No supplier found to be edited!")
    } else{
      this.router.navigate([`proveedores/formulario-proveedores/${selectedSupplier.id}`])
    }
  }

}