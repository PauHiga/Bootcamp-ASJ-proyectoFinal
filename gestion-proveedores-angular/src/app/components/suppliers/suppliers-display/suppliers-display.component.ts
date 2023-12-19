import { Component, OnInit } from '@angular/core';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';

@Component({
  selector: 'app-suppliers-display',
  templateUrl: './suppliers-display.component.html',
  styleUrl: './suppliers-display.component.css'
})
export class SuppliersDisplayComponent implements OnInit {

  proveedores: any = [];

  constructor(public suppliersService:SuppliersServiceService){}

  ngOnInit(): void {
    this.proveedores = this.suppliersService.getSuppliers();
  }
}
