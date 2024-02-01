import { Pipe, PipeTransform } from '@angular/core';
import { ProductDisplay } from '../models/productDisplay';

@Pipe({
  name: 'ordersProductSearch'
})
export class OrdersProductSearchPipe implements PipeTransform {

  transform(value: ProductDisplay[], args?: string): any {
    if (args === "" || args === undefined){
      return value;
    }

    return value.filter((item) => {
      const lowercaseName = item.name.toLowerCase();
      const lowerCaseArgs = args.toLowerCase();
      return lowercaseName.includes(lowerCaseArgs)
    });
  }
}
