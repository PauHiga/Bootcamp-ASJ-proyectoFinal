import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { ModalConfirmComponent } from './components/orders/modal-confirm/modal-confirm.component';
import { MainWelcomeComponent } from './components/welcome/main-welcome/main-welcome.component';
import { OrdersProductSearchPipe } from './pipes/orders-product-search.pipe';
import { FilterDeletedPipe } from './pipes/filter-deleted.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ListSuppliersComponent,
    FormSuppliersComponent,
    FormProductsComponent,
    ListProductsComponent,
    FormOrdersComponent,
    ListOrdersComponent,
    ModalConfirmComponent,
    MainWelcomeComponent,
    OrdersProductSearchPipe,
    FilterDeletedPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
