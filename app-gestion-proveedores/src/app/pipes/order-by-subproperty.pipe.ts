import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBySubproperty'
})
export class OrderBySubpropertyPipe implements PipeTransform {
  transform(value: any[], propertyName: string, subpropertyName: string, descending : boolean, activated: boolean): any[] {
    if (!value || !propertyName || !activated) {
      return value;
    }
    return value.slice().sort((a, b) => {
      const nameA = String(a[propertyName][subpropertyName]).toLowerCase();
      const nameB = String(b[propertyName][subpropertyName]).toLowerCase();

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