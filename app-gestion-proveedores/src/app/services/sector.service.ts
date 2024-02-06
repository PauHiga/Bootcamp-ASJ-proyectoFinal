import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:8080/8sectors'

  getSectors() : Observable<any>{
    return this.http.get<any>(this.URL_API);
  }

  saveSector(sectorToSave : any) : Observable<any>{
    const sector = {
      name: sectorToSave,
      deleted: false
    }
    return this.http.post<any>(this.URL_API, sector).pipe(
      catchError((error: any) => {
        throw error; 
      })
    );
  }

  logicalDeleteSector(id: number) : Observable<any> {
    return this.http.put<any>(this.URL_API + "/" + id, {deleted: true}).pipe(
      catchError((error: any) => {
        throw error; 
      })
    );
  }

  changeSectorName(id: number, newName : string) : Observable<any> {
    return this.http.put<any>(this.URL_API + "/" + id, {name: newName}).pipe(
      catchError((error: any) => {
        throw error; 
      })
    );
  }


}
