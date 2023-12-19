import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersDisplayComponent } from './components/suppliers/suppliers-display/suppliers-display.component';
import { OrdersDisplayComponent } from './components/orders/orders-display/orders-display.component';
import { ProductsDisplayComponent } from './components/products/products-display/products-display.component';
import { FormSuppliersComponent } from './components/suppliers/form-suppliers/form-suppliers.component';
import { FormProductsComponent } from './components/products/form-products/form-products.component';

const routes: Routes = [
  {path: 'proveedores', children:[
    {path: '', component: SuppliersDisplayComponent},
    {path: 'agregar-proveedor', component: FormSuppliersComponent}
  ]},
  {path: 'productos', children:[
    {path: '', component: ProductsDisplayComponent},
    {path: 'agregar-productos', component: FormProductsComponent}
  ]},
  {path: 'ordenes-de-compra', component: OrdersDisplayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
