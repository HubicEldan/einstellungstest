import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { addDays, addWeeks, eachDayOfInterval, format, formatISO, getMonth, getYear } from 'date-fns';
import { INode } from 'src/app/shared/models/INode';
import { DataService } from 'src/app/shared/services/data.service';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';

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
  nodes: INode[] = [];
  appointmentsForDay: INode[] = [];
  appointments: any[] = [];
  appointment = {
    date: '',
    hours: ''
  }
  constructor(private dataService: DataService, private dialog: MatDialog) { }



  ngOnInit(): void {
    this.selectedDate = new Date();
    this.getWeekRange();
    this.dataService.getJsonData().subscribe({
      next: (response) => {
        this.nodes = response.data.appointments.nodes;
        this.nodes.forEach(element => {
          this.appointment = {
            date: format(new Date(element.date), 'dd.MM.yyyy'),
            hours: format(new Date(element.date), 'H:mm')
          }
          this.appointments.push(this.appointment);
        })


        //ISPRAVITI, POTREBNO DA ISPIŠE APPOINTMENTSE ZA ODREĐENI DAN
        this.formatedWeekDays.forEach(element => {
          this.nodes.forEach(node => {
            if (format(new Date(node.date), 'dd.MM.yyyy') === element) {
              this.appointmentsForDay.push(node);
              console.log(this.appointmentsForDay);
              
            }
          })
        })
      },
      error: () => {
        console.error('Something went wrong!');
      },
      complete: () => {
        console.log('Data recieved successfully');
      }
    });

  

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

  openDialog(node: INode, nextNode: INode): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "700px";
    dialogConfig.width = "800px";
    dialogConfig.data = { node: node, nextNode: nextNode, appointmentsForDay: this.appointmentsForDay };
    this.dialog.open(AppointmentModalComponent, dialogConfig);
  }







}
