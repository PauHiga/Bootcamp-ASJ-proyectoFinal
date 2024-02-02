import { Injectable } from '@angular/core';
import { ProductsServiceService } from './products-service.service';
import { SupplierServiceService } from './supplier-service.service';
import { OrdersServiceService } from './orders-service.service';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private productService : ProductsServiceService, private suppliersService : SupplierServiceService, private ordersService : OrdersServiceService) { }

  getSuppliersCount(deleted? : boolean){
    return this.suppliersService.getSuppliersCount(deleted);
  }

  getProductsCount(deleted? : boolean){
    return this.productService.getProductsCount(deleted);
  }

  getOrdersCount(deleted? : boolean){
    return this.ordersService.getOrdersCount(deleted);
  }

}
