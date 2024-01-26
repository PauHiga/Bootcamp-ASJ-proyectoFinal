import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http:HttpClient) { }

  URL_API_SECTOR = 'http://localhost:8080/sectors'

  getSectors() : Observable<any>{
    return this.http.get<any>(this.URL_API_SECTOR);
  }

  saveSector(sectorToSave : any) : Observable<any>{
    const sector = {
      name: sectorToSave,
      deleted: 0
    }
    return this.http.post<any>(this.URL_API_SECTOR, sector);
  }

  logicalDeleteSector(id: string) : Observable<any> {
    return this.http.get<any>(this.URL_API_SECTOR + "/" + id).pipe(
      map((sector) => {
        let modifiedSector = { ...sector, deleted: true };
        return modifiedSector;
      }),
      switchMap((modifiedSector) => this.http.put <any> (this.URL_API_SECTOR + "/" + id, modifiedSector))
    );
  }
}
