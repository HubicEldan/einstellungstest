import { Component, OnInit } from '@angular/core';
import { addDays, getMonth, getWeek, getYear, lastDayOfWeek, subDays } from 'date-fns';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private dataService: DataService) { }
  appointments: any;
  cities: any[] = [];

  //selected
  selectedDate: Date = new Date();
  selectedDay!: number;


  lastDay!: Date;

  selectedCity: any;

  ngOnInit(): void {
    //  this.selectedDate = new Date(); 
    // this.selectedMonth = getMonth(this.selectedDate) + 1;
    // this.selectedYear = getYear(this.selectedDate);
    //  this.selectedDay = getDay(this.selectedDate);



    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];


    this.dataService.getJsonData().subscribe({
      next: (response) => {
        console.log(response.data.appointments);
        this.appointments = response.data.appointments;
      },
      error: () => {
        console.log('Something went wrong!');
      },
      complete: () => {
        console.log('Retrieved data successfully');
      }
    });
  }

  onMonthChange() {

  }

  onDayChange() {
    this.lastDay = addDays(this.selectedDate, 6);
  }


  next(isClicked: boolean) {
    if (isClicked) {
      this.selectedDate = addDays(this.selectedDate, 6);
      this.lastDay = addDays(this.selectedDate, 6);
    }
  }

  previous(isClicked: boolean) {
    if(isClicked) {
      this.selectedDate = subDays(this.selectedDate, 6);
      this.lastDay = subDays(this.selectedDate, 6);
     
      
    }
  }


}
