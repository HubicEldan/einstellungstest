import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addHours, format, subHours } from 'date-fns';

import { INode } from 'src/app/shared/models/INode';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss']
})
export class AppointmentModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { node: INode, nodes: INode[], date: Date }) { }
  next!: number;
  previous!: number;
  isLeftArrowVisible: boolean = true;
  isRightArrowVisible: boolean = true;


  ngOnInit(): void {
    let nodesForSort = [...this.data.nodes];
    this.data.nodes = nodesForSort.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }


  //još doraditi ove metode (kad se vraća uzima prvi odozdo i nevidljivost strelica popraviti)

  nextApp() {
    for (let i = 0; i < this.data.nodes.length; i++) {

      if ((format(new Date(this.data.node?.date), 'dd.MM.yyyy') === format(new Date(this.data.nodes[i]?.date), 'dd.MM.yyyy'))) {
        this.next = i;
        if (i === this.data.nodes.length - 1) {
          this.isRightArrowVisible = false;
          this.isLeftArrowVisible = true;
          this.next = this.data.nodes.length - 2;

        } else {

          this.isRightArrowVisible = true;
          this.isLeftArrowVisible = true;
        }
      }
    }
    this.next++;
    this.data.node = this.data.nodes[this.next];
  }


  previousApp() {
    for (let i = 0; i < this.data.nodes.length; i++) {
      if ((format(new Date(this.data.node!.date), 'dd.MM.yyyy') === format(new Date(this.data.nodes[i].date), 'dd.MM.yyyy'))) {
        this.previous = i++;

        if (this.previous === 0) {
          this.previous = 1;
          this.isRightArrowVisible = true;
          this.isLeftArrowVisible = false;
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
