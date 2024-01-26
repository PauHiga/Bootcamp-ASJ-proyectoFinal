import { Injectable, OnInit } from '@angular/core';
import { producto } from '../models/producto';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { SupplierServiceService } from './supplier-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService implements OnInit {
  constructor(private http:HttpClient, private suppliersService: SupplierServiceService) { }

  ngOnInit(): void {
  }

  URL_API = 'http://localhost:8080/products'

  product: producto = {
    id: '',
    idProveedor: '',
    SKUProducto: '',
    categoria: '',
    nombreProducto: '',
    descripcion: '',
    precio: 0,
    URLimage: ''
  }

  getProducts(): Observable<any>{
    return this.http.get(this.URL_API);
  }

  getAProduct(id:string): Observable<any>{
    return this.http.get(this.URL_API + "/" + id);
  }

  saveProduct() : Observable<any>{   
    console.log(this.product); 
    return this.http.post(this.URL_API, this.product);
  }

  setProductForEdit(productForEdit : any){
    this.product = productForEdit;
  }

  editProduct(id: string){
    return this.http.put(this.URL_API + "/" + id, this.product);
  }

  deleteProduct(id:string){
    return this.http.delete(this.URL_API + "/" + id)
  }

  clearProductData(){
    this.product = {
      id: '',
      idProveedor: '',
      SKUProducto: '',
      categoria: '',
      nombreProducto: '',
      descripcion: '',
      precio: 0,
      URLimage: ''
    }
  }

  getSuppliersList(): Observable<any> {
    return this.suppliersService.getSuppliers();
    }  

  // getCategories() : Observable<any>{
  //   return this.http.get<any>(this.URL_API_CATEGORIES);
  // }

  // saveCategory(sectorToSave : any) : Observable<any>{
  //   const sector = {
  //     name: sectorToSave,
  //     deleted: 0
  //   }
  //   return this.http.post<any>(this.URL_API_CATEGORIES, sector);
  // }

  // logicalDeleteCategory(id: string) : Observable<any> {
  //   return this.http.get<any>(this.URL_API_CATEGORIES + "/" + id).pipe(
  //     map((category) => {
  //       let modifiedCategory = { ...category, deleted: 1 };
  //       return modifiedCategory;
  //     }),
  //     switchMap((modifiedCategory) => this.http.put <any> (this.URL_API_CATEGORIES + "/" + id, modifiedCategory))
  //   );
  // }
}