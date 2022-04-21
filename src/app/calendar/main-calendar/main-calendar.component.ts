import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addDays, addWeeks, eachDayOfInterval, format, getMonth, getYear } from 'date-fns';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss']
})
export class MainCalendarComponent implements OnInit {
  @Output() nextButtonClickEvent = new EventEmitter<boolean>();
  @Output() perviousButtonClickEvent = new EventEmitter<boolean>();
  @Input() selectedDate!: Date;
  weekDays!: Date[];
  formatedWeekDays: string[] = [];
  nodes: any[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getJsonData().subscribe({
      next: (response) => {
        response.data.appointments.nodes.forEach((element: any) => {
          this.nodes.push(element);
        })
      },
      error: () => {
        console.log('Something went wrong!');
      },
      complete: () => {
        console.log('Data recieved successfully');
        console.log(this.nodes);
      }
    });

    console.log(this.nodes[0]);

    this.selectedDate = new Date();
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

    let newArr = this.weekDays.map(date => {
      return format(date, 'dd/MM/yyyy');
    });

    this.formatedWeekDays = newArr;

    return this.weekDays;
  }

  nextWeek(value: boolean) {
    this.nextButtonClickEvent.emit(value);
  }


  previousWeek(value: boolean) {
    this.perviousButtonClickEvent.emit(value);
  }



}
