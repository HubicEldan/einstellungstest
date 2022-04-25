import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addDays, addHours, format, subHours } from 'date-fns';
import { is } from 'date-fns/locale';
import { groupBy } from 'rxjs';
import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss']
})
export class AppointmentModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { node: INode | undefined, nodes: INode[], date: Date }) { }
  nextAppointments: INode[] = [];
  hideArrows: boolean = false;
  arr: any[] = [];
  next!: number;
  previous!: number;
  isLeftArrowVisible: boolean = true;
  isRightArrowVisible: boolean = true;
  ngOnInit(): void {
    console.log(this.data);


    for (let i = 0; i < this.data.nodes.length; i++) {

      if (this.data.node === this.data.nodes[i]) {
        this.next = i;
        if (i === this.data.nodes.length - 1) {
          this.isRightArrowVisible = false;
          this.isLeftArrowVisible = true;
          this.next = this.data.nodes.length - 2;
        }


      } else {


      }
    }

    // for (let i = 0; i < this.data.appointmentsForDay.length; i++) {
    //   this.arr.push(this.data.appointmentsForDay.slice(i));
    //   console.log(this.arr);

    // }


    for (let i = 0; i < this.data.nodes.length; i++) {
      if (this.data.node === this.data.nodes[i]) {
        this.previous = i;


        if (i === 0) {
          this.isLeftArrowVisible = false;
          this.isRightArrowVisible = true;
          this.previous = 1;
        }


      }
    }


  }


  nextApp() {
    for (let i = 0; i < this.data.nodes.length; i++) {


      if ((format(new Date(this.data.node!.date), 'dd.MM.yyyy') === format(new Date(this.data.nodes[i].date), 'dd.MM.yyyy')) && ((format(new Date(this.data.node!.date), 'HH:mm') === format(new Date(this.data.nodes[i].date), 'HH:mm')))) {
        i++;


        this.next = i;
        console.log(this.next);

        if (i === this.data.nodes.length - 1) {
          this.isRightArrowVisible = false;
          this.isLeftArrowVisible = true;
          this.next = this.data.nodes.length - 2;
        }


      } else {

        this.isRightArrowVisible = true;
        this.isLeftArrowVisible = true;
      }
    }
    this.next++;
    // if(this.next >= 0 && this.next <= this.data.nodes.length - 1) {
    //   this.isRightArrowVisible = true;
    // }

    this.data.node = this.data.nodes[this.next];


  }


  previousApp() {

    for (let i = 0; i < this.data.nodes.length; i++) {
      if ((format(new Date(this.data.node!.date), 'dd.MM.yyyy') === format(new Date(this.data.nodes[i].date), 'dd.MM.yyyy')) && ((format(new Date(this.data.node!.date), 'HH:mm') === format(new Date(this.data.nodes[i].date), 'HH:mm')))) {
        i--;
        this.previous = i;


        if (i === 0) {
          this.isRightArrowVisible = true;
          this.isLeftArrowVisible = false;
          this.previous = 1;
        } else {
          this.isRightArrowVisible = true;
          this.isLeftArrowVisible = true;
        }


      }
    }

    this.previous--;

    this.data.node = this.data.nodes[this.previous];


  }



  subtractHours(date: string | undefined, numOfHours: number) {
    return subHours(new Date(date!), numOfHours);
  }

  addHours(date: string | undefined, hours: number) {
    return addHours(new Date(date!), hours).toString();
  }
}
