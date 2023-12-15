import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersDisplayComponent } from './components/suppliers/suppliers-display/suppliers-display.component';
import { OrdersDisplayComponent } from './components/orders/orders-display/orders-display.component';
import { ProductsDisplayComponent } from './components/products/products-display/products-display.component';

const routes: Routes = [
  {path: 'proveedores', component: SuppliersDisplayComponent},
  {path: 'ordenes-de-compra', component: OrdersDisplayComponent},
  {path: 'productos', component: ProductsDisplayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
