import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss']
})
export class MainCalendarComponent implements OnInit {
  array: string[] = ['8.00', '9.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00', '19.00', '20.00'];
  array1: number[] = [1,2,3,4,5,6,7];
  constructor() { }

  ngOnInit(): void {
  }

}
