import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordersProductSearch'
})
export class OrdersProductSearchPipe implements PipeTransform {

  transform(value: any[], args?: string): any {
    if (args === "" || args === undefined){
      return value;
    }

    return value.filter((item) => {
      const lowercaseName = item.nombreProducto.toLowerCase();
      const lowerCaseArgs = args.toLowerCase();
      return lowercaseName.includes(lowerCaseArgs)
    });
  }
}
