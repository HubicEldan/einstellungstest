import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { addDays, eachDayOfInterval, format } from 'date-fns';
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

  weekDays!: Date[];
  formatedWeekDays: string[] = [];
  nodes: INode[] = [];
  appointmentsForDay: INode[] = [];
  appointments: any[] = [];
  arr: any[] = []
  appointment = {
    date: '',
    hours: ''
  }
  color: string = 'red';
  constructor(private dataService: DataService, private dialog: MatDialog) { }



  ngOnInit(): void {
    this.selectedDate = new Date();
    this.getWeekRange();
    this.dataService.getJsonData().subscribe({
      next: (response) => {
        this.nodes = response.data.appointments.nodes;
        this.nodes = this.nodes.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        console.log(this.nodes);

        this.nodes.forEach(element => {
          this.appointment = {
            date: format(new Date(element.date), 'dd.MM.yyyy'),
            hours: format(new Date(element.date), 'H:mm')
          }
          this.appointments.push(this.appointment);
        })
        this.getAppointmentsForToday();

        for (let i = 0; i < this.nodes.length; i++) {
          this.arr.push(this.nodes.slice(i));
          console.log(this.arr);
          
        }

      },
      error: () => {
        console.error('Something went wrong!');
      },
      complete: () => {
        console.log('Data recieved successfully');
      }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.appointmentsForDay = [];
      this.getWeekRange();
      this.getAppointmentsForToday();
    }
  }


  changeStyle($event: any) {
    this.color = $event.type == 'mouseover' ? 'selected' : 'notSelected';
  }


  getAppointmentsForToday() {
    this.formatedWeekDays.forEach(element => {

      this.nodes.forEach(node => {
        if (format(new Date(node.date), 'dd.MM.yyyy') === element) {
          this.appointmentsForDay.push(node);

        }
      })
    })
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


    this.formatedWeekDays = this.weekDays.map(date => {
      return format(date, 'dd.MM.yyyy');
    });

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
