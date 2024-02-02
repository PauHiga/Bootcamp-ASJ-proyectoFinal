import { Pipe, PipeTransform } from '@angular/core';
import { ProductDisplay } from '../models/productDisplay';

@Pipe({
  name: 'filterProductsInactive'
})
export class FilterProductsInactivePipe implements PipeTransform {

  transform(items: ProductDisplay[], deletedFlag: boolean): any[] {
    if (!items) {
      return [];
    }
    if(deletedFlag == true){
      return items.filter(item => item.deleted === deletedFlag || item.supplier.deleted == true);
    }
    else{
      return items.filter(item => item.deleted === false && item.supplier.deleted == false);
    }
  }
}