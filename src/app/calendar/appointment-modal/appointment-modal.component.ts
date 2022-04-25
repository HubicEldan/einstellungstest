import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addDays, addHours, subHours } from 'date-fns';
import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss']
})
export class AppointmentModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { node: INode, nodes: INode[], date: Date }) { }
  nextAppointments: INode[] = [];
  hideArrows: boolean = false;
  arr: any[] = [];
  ngOnInit(): void {
    console.log(this.data);

    // for (let i = 0; i < this.data.appointmentsForDay.length; i++) {
    //   this.arr.push(this.data.appointmentsForDay.slice(i));
    //   console.log(this.arr);

    // }


  }




  previousApp() {

    this.data.date = subHours(this.data.date, 1);
    console.log(this.data);
    
    console.log('prev');


  }

  nextApp() {
    this.data.date = addHours(this.data.date, 1);
    console.log(this.data.date);

    console.log('next');

  }

  subtractHours(date: string, numOfHours: number) {
    return subHours(new Date(date), numOfHours);
  }

  addHours(date: string, hours: number) {
    return addHours(new Date(date), hours).toString();
  }
}
