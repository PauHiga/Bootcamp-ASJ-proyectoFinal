import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../../../services/products-service.service';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrl: './products-display.component.css'
})
export class ProductsDisplayComponent implements OnInit {

  products: any = [];

  constructor(public ProductsService:ProductsServiceService){}

  ngOnInit(): void {
    this.products = this.ProductsService.getProducts();
  }
}
