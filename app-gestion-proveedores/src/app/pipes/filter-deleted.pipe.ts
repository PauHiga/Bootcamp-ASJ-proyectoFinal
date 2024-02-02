import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDeleted'
})
export class FilterDeletedPipe implements PipeTransform {

  transform(items: any[], deletedFlag: boolean): any[] {
    if (!items) {
      return [];
    }
    
    return items.filter(item => item.deleted === deletedFlag);
  }
}