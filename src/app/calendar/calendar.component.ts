import { Component, OnInit } from '@angular/core';
import { addDays, addMonths, getMonth, getWeek, getYear, lastDayOfWeek, subDays } from 'date-fns';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }
  cities: any[] = [];

  //selected
  selectedDate: Date = new Date();


  selectedCity: any;

  ngOnInit(): void {
    

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];


   
    
  }

  onMonthChange() {
    // this.selectedDate = addMonths(this.selectedDate, 1);
  }


  next(isNextClicked: boolean) {
    if (isNextClicked) {
      this.selectedDate = addDays(this.selectedDate, 6);

    }
  }

  previous(isPreviousClicked: boolean) {
    if (isPreviousClicked) {
      this.selectedDate = subDays(this.selectedDate, 6);
    }
  }


}
