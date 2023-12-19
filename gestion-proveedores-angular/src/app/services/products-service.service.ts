import { Injectable } from '@angular/core';
import { products } from '../data/dataProduct';
import { HttpClient } from '@angular/common/http';

const data = products

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  constructor( private http: HttpClient) { }

  public getProducts(){
    return data;
  }

  public addProduct(newProduct:any){
    data.push(newProduct);
  }
}
