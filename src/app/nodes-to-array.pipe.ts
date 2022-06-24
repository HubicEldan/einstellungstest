import { Pipe, PipeTransform } from '@angular/core';
import { format, subHours } from 'date-fns';

@Pipe({
  name: 'nodesToArray'
})
export class NodesToArrayPipe implements PipeTransform {

  transform(nodes: any, hour: any, day: any): any {
    if (!nodes) {
      return [];
    }

    return Array(nodes.filter((it: any) => {
      const itDate = format(new Date(it.date), 'dd');
      const itHour = format(new Date(it.date), 'HH');

      if (itDate === format(new Date(day), 'dd') && itHour === format(subHours(new Date(hour), -2), 'HH')) {
        return it;
      }


    }));
  }

}
