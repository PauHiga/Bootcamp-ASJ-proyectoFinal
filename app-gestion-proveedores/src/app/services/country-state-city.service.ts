import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {

  constructor(private http:HttpClient) { }

  private URL_API_COUNTRIES_STATES = 'https://countriesnow.space/api/v0.1/countries/states'
  private URL_API_CITIES = 'https://countriesnow.space/api/v0.1/countries/state/cities'

  getCountriesStates() : Observable<any>{
    return this.http.get(this.URL_API_COUNTRIES_STATES);
  }

  getCities(CountryState : any) : Observable<any>{
    return this.http.post(this.URL_API_CITIES, CountryState);
  }

  getCountries() : Observable<any> {
    return this.getCountriesStates().pipe(
      map((country)=>{
      return country.data.map((item: {name: string, states: string}) => ({name: item.name, states: item.states}));
    }))
  }
}
