import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { addDays, compareAsc, eachDayOfInterval, eachHourOfInterval, eachMinuteOfInterval, getDate, getHours, getYear, subHours } from 'date-fns';
import { INode } from 'src/app/shared/models/INode';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss']
})
export class MainCalendarComponent implements OnInit, OnChanges {
  constructor(private dialog: MatDialog) { }

  @Input() selectedDate!: Date;
  @Input() nodes!: INode[];
  @Output() nextButtonClickEvent = new EventEmitter<boolean>();
  @Output() perviousButtonClickEvent = new EventEmitter<boolean>();

  isHover!: boolean;
  hoursAndMinutesRangeArray: any[] = [];
  weekDaysArray!: Date[];
  hoursArray!: Date[];
  minutesArray!: Date[];
  today: Date = new Date();


  ngOnInit(): void {
    this.hoursAndMinutesRange();
    this.selectedDate = new Date();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.getWeekRange();
    }
  }

  //on appointment hover change week day styles
  hover(node: INode): void {
    this.isHover = true;
    this.isHover ? this.today = new Date(node.date) : null;
  }

  subtractHours(date: string | undefined, numOfHours: number) {
    return subHours(new Date(date!), numOfHours);
  }

  //creating week days range array
  getWeekRange(): Date[] {
    this.weekDaysArray = eachDayOfInterval({
      start: this.selectedDate,
      end: addDays(this.selectedDate, 6)
    });
    return this.weekDaysArray;
  }

  //creating hours range array
  getHoursRange(): Date[] {
    this.hoursArray = eachHourOfInterval({
      start: new Date(getYear(this.selectedDate), this.selectedDate.getMonth() + 1, getDate(this.selectedDate), 8),
      end: new Date(getYear(this.selectedDate), this.selectedDate.getMonth() + 1, getDate(this.selectedDate), 21),
    });
    return this.hoursArray;
  }

  //creating hours and minutes range array
  hoursAndMinutesRange() {
    for (let i = 0; i <= this.getHoursRange().length - 2; i++) {
      this.minutesArray = eachMinuteOfInterval({
        start: new Date(getYear(this.selectedDate), this.selectedDate.getMonth() + 1, getDate(this.selectedDate), getHours(this.getHoursRange()[i])),
        end: new Date(getYear(this.selectedDate), this.selectedDate.getMonth() + 1, getDate(this.selectedDate), getHours(this.getHoursRange()[i + 1])),
      });
      this.hoursAndMinutesRangeArray.push(this.minutesArray);
    }
  }

  //switch to next week button clicked, emit true
  nextWeek(value: boolean) {
    this.nextButtonClickEvent.emit(value);
  }

  //switch to previous week button clicked, emit true
  previousWeek(value: boolean) {
    this.perviousButtonClickEvent.emit(value);
  }

  //checking if the meeting has passed compared to today
  expiredAppointments(node: INode): boolean {
    let flag: boolean = false;
    let today = new Date();
    if (compareAsc(today, new Date(node?.date)) === -1) {
      flag = true;
    } else {
      flag = false;
    }

    return flag;
  }

  openDialog(node: INode[]): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "700px";
    dialogConfig.width = "800px";
    dialogConfig.data = { node: node, nodes: this.nodes, date: this.selectedDate };
    this.dialog.open(AppointmentModalComponent, dialogConfig);
  }





}
