import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:8080/sectors'

  getSectors() : Observable<any>{
    return this.http.get<any>(this.URL_API);
  }

  saveSector(sectorToSave : any) : Observable<any>{
    const sector = {
      name: sectorToSave,
      deleted: 0
    }
    return this.http.post<any>(this.URL_API, sector);
  }

  logicalDeleteSector(id: number) : Observable<any> {
    return this.http.put<any>(this.URL_API + "/" + id, {deleted: true})
  }

  changeSectorName(id: number, newName : string) : Observable<any> {
    return this.http.put<any>(this.URL_API + "/" + id, {name: newName})
  }

  // logicalDeleteSector(id: string) : Observable<any> {
  //   return this.http.get<any>(this.URL_API + "/" + id).pipe(
  //     map((sector) => {
  //       let modifiedSector = { ...sector, deleted: true };
  //       return modifiedSector;
  //     }),
  //     switchMap((modifiedSector) => this.http.put <any> (this.URL_API + "/" + id, modifiedSector))
  //   );
  // }
}
