import { Pipe, PipeTransform } from '@angular/core';
import { OrderDisplay } from '../models/orderDisplay';

@Pipe({
  name: 'filterOrders'
})
export class FilterOrdersPipe implements PipeTransform {

  transform(value: OrderDisplay[], args?: string): any {
    if (args === "" || args === undefined || args === "Display all"){
      return value;
    }

    return value.filter((item) => {
        return item.status.name.includes(args);
    });
  }
}