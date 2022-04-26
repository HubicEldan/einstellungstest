import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { addDays, eachDayOfInterval, eachHourOfInterval, eachMinuteOfInterval, format, getDate, getHours, getYear, subHours } from 'date-fns';
import { INode } from 'src/app/shared/models/INode';
import { DataService } from 'src/app/shared/services/data.service';
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
  @Input() nodes: INode[] = [];
  sameDaySameHourAppointments: INode[] = [];
  sameDayAppointments: INode[] = [];
  hoursAndMinutesRangeArray: any[] = [];
  weekDaysArray!: Date[];
  hoursArray!: Date[];
  minutesArray!: Date[];
  nextViewing: INode[] = [];
  color: string = 'red';
  constructor(private dialog: MatDialog) { }



  ngOnInit(): void {
    this.hoursAndMinutesRange();
    this.selectedDate = new Date();
    // this.getWeekRange();


   


  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      // this.appointmentsForDay = [];
      this.getWeekRange();
      // this.getAppointmentsForToday();
    }
  }

  subtractHours(date: string, numOfHours: number) {
    return subHours(new Date(date), numOfHours);
  }


  //promijeniti ovu metodu, uzima sve appointmentse za čitavu sedmicu, a treba da uzme samo za jedan dan
  // getAppointmentsForToday() {
  //   this.formatedWeekDays.forEach(element => {
  //     this.nodes.forEach(node => {
  //       if (format(new Date(node.date), 'dd.MM.yyyy') === element) {
  //         console.log(node);
  //         this.appointmentsForDay.push(node);
  //       }
  //     })
  //   })
  // }

  getWeekRange(): Date[] {
    this.weekDaysArray = eachDayOfInterval({
      start: this.selectedDate,
      end: addDays(this.selectedDate, 6)
    })

    return this.weekDaysArray;
  }

  getHoursRange(): Date[] {
    this.hoursArray = eachHourOfInterval({
      start: new Date(getYear(this.selectedDate), this.selectedDate.getMonth() + 1, getDate(this.selectedDate), 8),
      end: new Date(getYear(this.selectedDate), this.selectedDate.getMonth() + 1, getDate(this.selectedDate), 21),
    })


    return this.hoursArray;
  }




  hoursAndMinutesRange() {
    for (let i = 0; i <= this.getHoursRange().length - 2; i++) {
      this.minutesArray = eachMinuteOfInterval({
        start: new Date(getYear(this.selectedDate), this.selectedDate.getMonth() + 1, getDate(this.selectedDate), getHours(this.getHoursRange()[i])),
        end: new Date(getYear(this.selectedDate), this.selectedDate.getMonth() + 1, getDate(this.selectedDate), getHours(this.getHoursRange()[i + 1])),
      })

      this.hoursAndMinutesRangeArray.push(this.minutesArray)
    }


  }



  nextWeek(value: boolean) {
    this.nextButtonClickEvent.emit(value);
  }


  previousWeek(value: boolean) {
    this.perviousButtonClickEvent.emit(value);
  }




  openDialog(node: INode, nodes: INode[]): void {
    this.sameDayAppointments = [];
    this.sameDaySameHourAppointments = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (format(new Date(node.date), 'dd.MM.yyyy') === format(new Date(this.nodes[i].date), 'dd.MM.yyyy')) {
        this.sameDayAppointments.push(this.nodes[i]);
      }
    }

    for (let i = 0; i < this.nodes.length; i++) {
      if ((format(new Date(node.date), 'dd.MM.yyyy') === format(new Date(this.nodes[i].date), 'dd.MM.yyyy')) && (format(new Date(node.date), 'HH:mm') === format(new Date(this.nodes[i].date), 'HH:mm'))) {
        this.sameDaySameHourAppointments.push(this.nodes[i]);
      }
    }

    // console.log(this.sameDayAppointments);
    // console.log(this.sameDaySameHourAppointments);



    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "700px";
    dialogConfig.width = "800px";
    dialogConfig.data = { node: node, nodes: nodes, date: this.selectedDate };
    this.dialog.open(AppointmentModalComponent, dialogConfig);

  }





}
