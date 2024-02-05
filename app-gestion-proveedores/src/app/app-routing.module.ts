import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSuppliersComponent } from './components/suppliers/form-suppliers/form-suppliers.component';
import { ListSuppliersComponent } from './components/suppliers/list-suppliers/list-suppliers.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { FormProductsComponent } from './components/products/form-products/form-products.component';
import { ListOrdersComponent } from './components/orders/list-orders/list-orders.component';
import { FormOrdersComponent } from './components/orders/form-orders/form-orders.component';
import { MainWelcomeComponent } from './components/welcome/main-welcome/main-welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';


const routes: Routes = [
  {path: "", component:MainWelcomeComponent, canActivate: [authGuard]},
  {path: 'suppliers', canActivate: [authGuard], children:[
    {path: '', component:ListSuppliersComponent},
    {path: 'supplier-form', canActivate: [authGuard], children:[
      {path:'', component:FormSuppliersComponent},
      {path:':edit', component:FormSuppliersComponent}
    ]}
  ]},
  {path: 'products', canActivate: [authGuard], children:[
    {path: '', component:ListProductsComponent},
    {path: 'product-form', children:[
      {path:'', component:FormProductsComponent},
      {path:':edit', component:FormProductsComponent}
    ]}
  ]},
  {path: 'orders', canActivate: [authGuard],  children:[
    {path: '', component:ListOrdersComponent},
    {path: 'order-form', children:[
      {path:'', component:FormOrdersComponent},
      {path:':edit', component:FormOrdersComponent}
    ]}
  ]},
  {path: 'login', component:LoginComponent},
  { path: '**', canActivate: [authGuard], component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
