import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addHours } from 'date-fns';
import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss']
})
export class AppointmentModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { node: INode, appointmentsForDay: INode[], nextNode: INode }) { }
  nextAppointments: INode[] = [];
  hideArrows: boolean = false;
  arr: any[] = [];
  ngOnInit(): void {
    console.log(this.data);

    for (let i = 0; i < this.data.appointmentsForDay.length; i++) {
      this.arr.push(this.data.appointmentsForDay.slice(i));
      console.log(this.arr);
      
    }


  }

  addHour(date: string, hours: number): Date {
    return addHours(new Date(date), hours);
  }


  previousApp() {
    console.log('prev');

  }

  nextApp() {
    console.log('next');

  }

}
