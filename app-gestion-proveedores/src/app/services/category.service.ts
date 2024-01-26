import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  URL_API_CATEGORY = 'http://localhost:8080/categories'

  getCategories() : Observable<any>{
    return this.http.get<any>(this.URL_API_CATEGORY);
  }

  saveCategory(categoryToSave : any) : Observable<any>{
    const category = {
      name: categoryToSave,
      deleted: 0
    }
    return this.http.post<any>(this.URL_API_CATEGORY, category);
  }

  logicalDeleteCategory(id: string) : Observable<any> {
    return this.http.get<any>(this.URL_API_CATEGORY + "/" + id).pipe(
      map((category) => {
        let modifiedCategory = { ...category, deleted: true };
        return modifiedCategory;
      }),
      switchMap((modifiedCategory) => this.http.put <any> (this.URL_API_CATEGORY + "/" + id, modifiedCategory))
    );
  }
}
