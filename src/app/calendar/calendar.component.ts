import { Component, OnInit } from '@angular/core';
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
  date14!: Date;
  selectedCity: any;

  ngOnInit(): void {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
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
}
