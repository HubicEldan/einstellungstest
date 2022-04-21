import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addDays, addWeeks, eachDayOfInterval, getMonth, getYear } from 'date-fns';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss']
})
export class MainCalendarComponent implements OnInit {
  @Output() nextButtonClickEvent = new EventEmitter<boolean>();
  @Output() perviousButtonClickEvent = new EventEmitter<boolean>();
  @Input() selectedDate!: Date;
  @Input() lastDay!: Date;
  weekDays!: Date[];

 
  constructor() { }

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.lastDay = addDays(this.selectedDate, 6);
    this.getWeekRange();
  }

  getTimeRange(from: number, until: number): string[] {
    let hoursArray: string[] = [];
    for (let i = from; i <= until; i++) {
      hoursArray.push(i + ':00');
    }
    return hoursArray;
  }

  getWeekRange(): Date[] {
    this.weekDays = eachDayOfInterval({
      start: this.selectedDate,
      end: addDays(this.selectedDate, 6)
    })
    return this.weekDays;
  }



  nextWeek(value: boolean) {
    this.nextButtonClickEvent.emit(value);
  }


  previousWeek(value: boolean) {
    this.perviousButtonClickEvent.emit(value);
  }



}
