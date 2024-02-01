import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/shared/header/header.component';
import { MainComponent } from './components/shared/main/main.component';
import { ListSuppliersComponent } from './components/suppliers/list-suppliers/list-suppliers.component';
import { FormSuppliersComponent } from './components/suppliers/form-suppliers/form-suppliers.component';
import { FormProductsComponent } from './components/products/form-products/form-products.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { FormOrdersComponent } from './components/orders/form-orders/form-orders.component';
import { ListOrdersComponent } from './components/orders/list-orders/list-orders.component';
import { MainWelcomeComponent } from './components/welcome/main-welcome/main-welcome.component';
import { OrdersProductSearchPipe } from './pipes/orders-product-search.pipe';
import { FilterDeletedPipe } from './pipes/filter-deleted.pipe';
import { FilterSuppliersPipe } from './pipes/filter-suppliers.pipe';
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { FilterOrdersPipe } from './pipes/filter-orders.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { OrderByCountryPipe } from './pipes/order-by-country.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FormSuppliersComponent,
    FormProductsComponent,
    ListProductsComponent,
    FormOrdersComponent,
    ListOrdersComponent,
    MainWelcomeComponent,
    OrdersProductSearchPipe,
    FilterDeletedPipe,
    FilterSuppliersPipe,
    FilterProductsPipe,
    FilterOrdersPipe,
    OrderByPipe,
    OrderByCountryPipe,
    ListSuppliersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgbTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
