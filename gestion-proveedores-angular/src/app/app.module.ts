import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './components/general-display/sidebar/sidebar.component';
import { MainComponent } from './components/general-display/main/main.component';
import { HeaderComponent } from './components/general-display/header/header.component';
import { FooterComponent } from './components/general-display/footer/footer.component';
import { SuppliersDisplayComponent } from './components/suppliers/suppliers-display/suppliers-display.component';
import { FormSuppliersComponent } from './components/suppliers/form-suppliers/form-suppliers.component';
import { TableSuppliersComponent } from './components/suppliers/table-suppliers/table-suppliers.component';
import { ProductsDisplayComponent } from './components/products/products-display/products-display.component';
import { FormProductsComponent } from './components/products/form-products/form-products.component';
import { TableProductsComponent } from './components/products/table-products/table-products.component';
import { OrdersDisplayComponent } from './components/orders/orders-display/orders-display.component';
import { FormOrdersComponent } from './components/orders/form-orders/form-orders.component';
import { TableOrdersComponent } from './components/orders/table-orders/table-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SuppliersDisplayComponent,
    FormSuppliersComponent,
    TableSuppliersComponent,
    ProductsDisplayComponent,
    FormProductsComponent,
    TableProductsComponent,
    OrdersDisplayComponent,
    FormOrdersComponent,
    TableOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
