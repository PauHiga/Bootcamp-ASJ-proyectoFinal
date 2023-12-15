import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './components/general-display/sidebar/sidebar.component';
import { MainComponent } from './components/general-display/main/main.component';
import { HeaderComponent } from './components/general-display/header/header.component';
import { FooterComponent } from './components/general-display/footer/footer.component';
import { SuppliersDisplayComponent } from './components/suppliers/suppliers-display/suppliers-display.component';
import { FormComponent } from './components/suppliers/form/form.component';
import { TableComponent } from './components/suppliers/table/table.component';
import { ProductsDisplayComponent } from './components/products/products-display/products-display.component';
import { OrdersDisplayComponent } from './components/orders/orders-display/orders-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { FormProductsComponent } from './components/products/form-products/form-products.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SuppliersDisplayComponent,
    FormComponent,
    TableComponent,
    ProductsDisplayComponent,
    OrdersDisplayComponent,
    FormProductsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
