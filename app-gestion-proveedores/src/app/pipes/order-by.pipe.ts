import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], propertyName: string, descending : boolean, activated: boolean): any[] {
    if (!value || !propertyName || !activated) {
      return value;
    }
    return value.slice().sort((a, b) => {
      const numberA = parseFloat(a[propertyName])
      const numberB = parseFloat(b[propertyName])
      if(isNaN(numberA)){
        const nameA = String(a[propertyName]).toLowerCase();
        const nameB = String(b[propertyName]).toLowerCase();
  
        let comparison = 0;
        if (nameA > nameB) {
          comparison = 1;
        } else if (nameA < nameB) {
          comparison = -1;
        }
  
        return descending ? comparison * -1 : comparison;
      }
      else{
        return descending ? (numberA - numberB) * -1 : numberA - numberB;
      }
    })
  }
}