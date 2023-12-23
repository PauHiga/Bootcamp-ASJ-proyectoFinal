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

  ngOnInit(): void {
    this.proveedores = this.supplierService.getSuppliers();
  }

  proveedores : proveedor[] = []

  deleteSupplier(codigo:string){
    this.supplierService.deleteSupplier(codigo)
    this.proveedores = this.supplierService.getSuppliers();
  }
  editSupplier(codigo:string){
    this.router.navigate([`proveedores/formulario-proveedores/${codigo}`])
  }

}