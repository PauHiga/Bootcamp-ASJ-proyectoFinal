import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], propertyName: string, descending : boolean): any[] {
    if (!value || !propertyName) {
      return value;
    }
    
    return value.slice().sort((a, b) => {
      const nameA = String(a[propertyName]).toLowerCase();
      const nameB = String(b[propertyName]).toLowerCase();

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