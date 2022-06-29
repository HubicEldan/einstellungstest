import { Pipe, PipeTransform } from '@angular/core';
import { format, subHours } from 'date-fns';

@Pipe({
  name: 'nodesToArray'
})
export class NodesToArrayPipe implements PipeTransform {

  transform(nodes: any, hour: Date, day: Date): any {
    if (!nodes) {
      return [];
    }

    return Array(nodes.filter((appointment: any) => {
      const appointmentDate = format(new Date(appointment.date), 'dd');
      const appointmentHour = format(new Date(appointment.date), 'HH');

      if (appointmentDate === format(new Date(day), 'dd') && appointmentHour === format(subHours(new Date(hour), -2), 'HH')) {
        return appointment;
      }
    }));
  }

}
