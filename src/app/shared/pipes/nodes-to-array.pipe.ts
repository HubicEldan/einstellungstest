/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Pipe, PipeTransform } from '@angular/core';
import { format, subHours } from 'date-fns';
import { INode } from '../models/INode';


@Pipe({
  name: 'nodesToArray'
})
export class NodesToArrayPipe implements PipeTransform {

  transform(nodes: any, hour: Date, day: Date): any {
    if (!nodes) {
      return [];
    }

    return Array(nodes.filter((appointment: INode) => {
      const appointmentDate = format(new Date(appointment.date), 'dd.MM.yyyy');
      const appointmentHour = format(new Date(appointment.date), 'HH');

      if (appointmentDate === format(new Date(day), 'dd.MM.yyyy') && appointmentHour === format(subHours(new Date(hour), -2), 'HH')) {
        return appointment;
      }
      return null;
    }));
  }

}
