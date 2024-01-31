import { Pipe, PipeTransform } from '@angular/core';
import { SupplierDisplay } from '../models/supplierDisplay';

@Pipe({
  name: 'orderByCountry'
})
export class OrderByCountryPipe implements PipeTransform {
  transform(value: SupplierDisplay[], descending : boolean): any[] {

    if (!value) {
      return value;
    }
    
    const orderedByProvince = value.slice().sort((a, b) => {
      const nameA = a.address.locality.province.name.toLowerCase();
      const nameB = b.address.locality.province.name.toLowerCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }

      return comparison;
    });

    return orderedByProvince.slice().sort((a, b) => {
      const nameA = a.address.locality.province.country.name.toLowerCase();
      const nameB = b.address.locality.province.country.name.toLowerCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }

      return descending ? comparison * -1 : comparison;
    });
  }
}

