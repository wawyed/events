import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T> implements PipeTransform {
  transform(value: Array<T>, filterCriteria: string, filterBy: (criteria: string, value: T) => boolean): Array<T> {
    if (!value) {
      return value;
    }

    return value.filter((item: T) => {
      return filterBy(filterCriteria, item);
    });
  }
}
