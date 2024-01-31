import { Pipe, PipeTransform } from '@angular/core';
import { ProductDisplay } from '../models/productDisplay';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(value: ProductDisplay[], args?: string): any {
    if (args === "" || args === undefined){
      return value;
    }

    return value.filter((item) => {
        const lowercaseName = item.name.toLowerCase();
        const lowercaseDescription = item.description.toLowerCase();
        const lowercaseCategory = item.category.name.toLowerCase();
        const lowercaseBusinessName = item.supplier.business_name.toLowerCase();
        const lowerCaseArgs = args.toLowerCase();
        return lowercaseBusinessName.includes(lowerCaseArgs) || lowercaseName.includes(lowerCaseArgs) || lowercaseDescription.includes(lowerCaseArgs) || lowercaseCategory.includes(lowerCaseArgs);
    });
  }
}