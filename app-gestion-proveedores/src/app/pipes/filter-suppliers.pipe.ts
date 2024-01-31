import { Pipe, PipeTransform } from '@angular/core';
import { Supplier } from '../models/supplier';

@Pipe({
  name: 'filterSuppliers'
})
export class FilterSuppliersPipe implements PipeTransform {

  transform(value: Supplier[], args?: string): any {
    if (args === "" || args === undefined){
      return value;
    }

    return value.filter((item) => {
        const lowercaseBusinessName = item.business_name.toLowerCase();
        const lowercaseCode = item.code.toLowerCase();
        const lowerCaseArgs = args.toLowerCase();
        return lowercaseBusinessName.includes(lowerCaseArgs) || lowercaseCode.includes(lowerCaseArgs);
    });
  }
}
