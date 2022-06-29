import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { addDays, eachDayOfInterval, eachHourOfInterval, eachMinuteOfInterval, getDate, getHours, getYear, subHours } from 'date-fns';
import { INode } from 'src/app/shared/models/INode';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss']
})
export class MainCalendarComponent implements OnInit, OnChanges {
  @Output() nextButtonClickEvent = new EventEmitter<boolean>();
  @Output() perviousButtonClickEvent = new EventEmitter<boolean>();
  @Input() selectedDate!: Date;
  @Input() nodes!: INode[];
  isHover!: boolean;
  hoursAndMinutesRangeArray: any[] = [];
  weekDaysArray!: Date[];
  hoursArray!: Date[];
  minutesArray!: Date[];
  today: Date = new Date();
  todayMinutesHours = new Date();
  constructor(private dialog: MatDialog) { }


  ngOnInit(): void {
    this.hoursAndMinutesRange();
    this.selectedDate = new Date();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.getWeekRange();
    }
  }

  hover(node: INode): void {
    this.isHover = true;
    this.isHover ? this.today = new Date(node.date) : null;
  }

  subtractHours(date: string | undefined, numOfHours: number) {
    return subHours(new Date(date!), numOfHours);
  }

  getWeekRange(): Date[] {
    this.weekDaysArray = eachDayOfInterval({
      start: this.selectedDate,
      end: addDays(this.selectedDate, 6)
    });
    return this.weekDaysArray;
  }

  getHoursRange(): Date[] {
    this.hoursArray = eachHourOfInterval({
      start: new Date(getYear(this.selectedDate), this.selectedDate.getMonth() + 1, getDate(this.selectedDate), 8),
      end: new Date(getYear(this.selectedDate), this.selectedDate.getMonth() + 1, getDate(this.selectedDate), 21),
    });
    return this.hoursArray;
  }

  hoursAndMinutesRange() {
    for (let i = 0; i <= this.getHoursRange().length - 2; i++) {
      this.minutesArray = eachMinuteOfInterval({
        start: new Date(getYear(this.selectedDate), this.selectedDate.getMonth() + 1, getDate(this.selectedDate), getHours(this.getHoursRange()[i])),
        end: new Date(getYear(this.selectedDate), this.selectedDate.getMonth() + 1, getDate(this.selectedDate), getHours(this.getHoursRange()[i+1])),
      });
      this.hoursAndMinutesRangeArray.push(this.minutesArray);
    }
  }

  nextWeek(value: boolean) {
    this.nextButtonClickEvent.emit(value);
  }

  previousWeek(value: boolean) {
    this.perviousButtonClickEvent.emit(value);
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
