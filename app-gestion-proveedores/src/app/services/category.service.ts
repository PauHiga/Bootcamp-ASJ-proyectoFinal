import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:8080/categories'

  getCategories() : Observable<any>{
    return this.http.get<any>(this.URL_API);
  }

  saveCategory(categoryToSave : any) : Observable<any>{
    const category = {
      name: categoryToSave,
      deleted: 0
    }
    return this.http.post<any>(this.URL_API, category);
  }

  logicalDeleteCategory(id: number) : Observable<any> {
    return this.http.put<any>(this.URL_API + "/" + id, {deleted: true})
  }

  changeCategoryName(id: number, newName : string) : Observable<any> {
    return this.http.put<any>(this.URL_API + "/" + id, {name: newName})
  }
}
