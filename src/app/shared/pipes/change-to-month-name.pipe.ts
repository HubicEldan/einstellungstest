import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeToMonthName'
})
export class ChangeToMonthNamePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let monthName: string = '';
    switch (value) {
      case 1:
        monthName = "January";
        break;
      case 2:
        monthName = "February";
        break;
      case 3:
        monthName = "March";
        break;
      case 4:
        monthName = "April";
        break;
      case 5:
        monthName = "May";
        break;
      case 6:
        monthName = "Juny";
        break;
      case 7:
        monthName = "July";
        break;
      case 8:
        monthName = "August";
        break;
      case 9:
        monthName = "September";
        break;
      case 10:
        monthName = "October";
        break;
      case 11:
        monthName = "November";
        break;
      case 12:
        monthName = "December";
        break;
      default:
        break;
    }
    return monthName;
  }

}
