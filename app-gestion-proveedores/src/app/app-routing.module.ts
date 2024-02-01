import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSuppliersComponent } from './components/suppliers/form-suppliers/form-suppliers.component';
import { ListSuppliersComponent } from './components/suppliers/list-suppliers/list-suppliers.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { FormProductsComponent } from './components/products/form-products/form-products.component';
import { ListOrdersComponent } from './components/orders/list-orders/list-orders.component';
import { FormOrdersComponent } from './components/orders/form-orders/form-orders.component';
import { MainWelcomeComponent } from './components/welcome/main-welcome/main-welcome.component';


const routes: Routes = [
  {path: "", component:MainWelcomeComponent},
  {path: 'suppliers', children:[
    {path: '', component:ListSuppliersComponent},
    {path: 'supplier-form', children:[
      {path:'', component:FormSuppliersComponent},
      {path:':edit', component:FormSuppliersComponent}
    ]}
  ]},
  {path: 'products', children:[
    {path: '', component:ListProductsComponent},
    {path: 'product-form', children:[
      {path:'', component:FormProductsComponent},
      {path:':edit', component:FormProductsComponent}
    ]}
  ]},
  {path: 'orders', children:[
    {path: '', component:ListOrdersComponent},
    {path: 'order-form', children:[
      {path:'', component:FormOrdersComponent},
      {path:':edit', component:FormOrdersComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
