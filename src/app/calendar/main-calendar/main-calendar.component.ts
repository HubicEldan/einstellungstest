import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addDays, addWeeks, eachDayOfInterval, format, formatISO, getMonth, getYear } from 'date-fns';
import { INode } from 'src/app/shared/models/INode';
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
  isAppointment!: boolean;


  
  weekDays!: Date[];
  formatedWeekDays: string[] = [];
  nodes: INode[] = [];


  appointments: any[] = [];
  appointment = {
    date: '',
    hours: ''
  }
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getJsonData().subscribe({
      next: (response) => {
        this.nodes = response.data.appointments.nodes;
        this.nodes.forEach(element => {
          this.appointment = {
            date: format(new Date(element.date), 'dd.MM.yyyy'),
            hours: format(new Date(element.date), 'H:mm')
          }
          this.appointments.push(this.appointment)
        })
        console.log(this.appointments);
        console.log(this.nodes);
        
      },
      error: () => {
        console.error('Something went wrong!');
      },
      complete: () => {
        console.log('Data recieved successfully');
      }
    });
 
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
      return format(date, 'dd.MM.yyyy');
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
